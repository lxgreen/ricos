const globby = require('globby');
const fs = require('fs-extra');
const path = require('path');
const ts = require('typescript');
const { flattenDeep, union } = require('lodash');
const getFolderNamePkgMap = packageJsonFiles => {
  const folderNamePkgMap = [];
  packageJsonFiles.forEach(pkgJsonPath => {
    const absolutePath = path.resolve(pkgJsonPath);
    const pkgJson = fs.readJSONSync(absolutePath);
    const splitedPaths = absolutePath.split(path.sep);
    const packageFolderName = splitedPaths[splitedPaths.length - 3]; // ex: packages/ricos/web/package.json
    folderNamePkgMap.push({
      folderAbsolutePath: path.dirname(absolutePath),
      folderName: packageFolderName,
      packageName: packageFolderName,
    });
  });
  return folderNamePkgMap;
};

const writeFileTsFile = (folderName, references = []) => {
  const tsConfigTemplate = fs.readFileSync(path.join(__dirname, 'tsconfig.template'));
  const referenceStr = references.map(reference => {
    return `{
              "path": "../../web/${reference}"
          }`;
  });
  const tsConfigFile = tsConfigTemplate.toString().replace('${references}', referenceStr);
  fs.writeFileSync(`${folderName}/tsconfig.json`, tsConfigFile);
  //   console.log(tsConfigTemplate.toString().replace('${references}', referenceStr));
};

const getImportFromPackage = async package => {
  const files = await globby([
    `packages/${package.folderName}/web/src/**/*.{ts, tsx}`,
    `packages/${package.folderName}/web/lib/**/*.{ts, tsx}`,
  ]);
  const totalImports = [];
  files.forEach(file => {
    const filePath = path.resolve(file);
    const imports = ts
      .preProcessFile(fs.readFileSync(filePath, 'utf8'), true, true)
      .importedFiles.map(({ fileName }) => fileName);
    totalImports.push(imports);
  });

  return union(flattenDeep(totalImports));
};

const getReferencesFromPackage = (packages, imports) => {
  const foundPkgs = [];
  //   console.log(imports);
  union(imports).forEach(importItem => {
    const pkgs = packages.find(pkg => {
      //   console.log(importItem);
      return importItem.includes(`${pkg.packageName}`) && importItem.indexOf('..') === -1;
    });
    if (pkgs) {
      foundPkgs.push(pkgs);
    }
  });
  return foundPkgs;
};

const build = async () => {
  const packageJsonFiles = await globby(
    ['packages/**/web/package.json', '!packages/template-atomic-plugin/'],
    { realpath: true }
  );
  const pkgFolderNameMap = {};
  const packages = getFolderNamePkgMap(packageJsonFiles);
  const singlePkg = packages[5];
  console.log(singlePkg);
  packages.forEach(async pkg => {
    const imports = await getImportFromPackage(pkg);
    const references = getReferencesFromPackage(packages, imports);
    writeFileTsFile(
      pkg.folderAbsolutePath,
      union(references.map(reference => reference.packageName))
    );
  });

  //   packages.forEach(packages => {
  //   });
};

build();
