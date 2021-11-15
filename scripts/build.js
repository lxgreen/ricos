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
      packageName: pkgJson.name,
    });
  });
  return folderNamePkgMap;
};

const writeFileTsFile = (pkg, references = []) => {
  const tsConfigTemplate = fs.readFileSync(path.join(__dirname, 'tsconfig.template'));
  console.log(pkg.folderAbsolutePath, references);
  const referenceStr = references
    .filter(reference => reference !== pkg.folderName)
    .map(reference => {
      return `{
              "path": "../../${reference}/web"
          }`;
    });
  const tsConfigFile = tsConfigTemplate.toString().replace('${references}', referenceStr);
  fs.writeFileSync(`${pkg.folderAbsolutePath}/tsconfig.json`, tsConfigFile);
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
      // if (importItem.includes('wix')) {
      //   console.log(importItem);
      // }
      return importItem === pkg.packageName && importItem.indexOf('..') === -1;
    });
    if (pkgs) {
      foundPkgs.push(pkgs);
    }
  });
  return foundPkgs;
};

const createAllReferences = packages => {
  console.log(
    packages
      .map(pkg => `./packages/${pkg.folderName}/web`)
      .map(pkg => {
        return `{"path": "${pkg}"}`;
      })
  );
};

const build = async () => {
  const packageJsonFiles = await globby(
    [
      'packages/**/web/package.json',
      '!packages/template-atomic-plugin/',
      '!packages/ricos-schema/',
    ],
    { realpath: true }
  );
  const pkgFolderNameMap = {};
  const packages = getFolderNamePkgMap(packageJsonFiles);
  // console.log(
  //   packages
  //     .map(pkg => `./packages/${pkg.folderName}/web`)
  //     .map(pkg => {
  //       return `{"path": "${pkg}"}`;
  //     })
  // );

  // const singlePkg = [packages[5]];
  // console.log(singlePkg);
  packages.forEach(async pkg => {
    const imports = await getImportFromPackage(pkg);
    // console.log(imports, packages);
    const references = getReferencesFromPackage(packages, imports);
    writeFileTsFile(pkg, union(references.map(reference => reference.folderName)));
  });
};

build();
