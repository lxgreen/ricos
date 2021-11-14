const globby = require('globby');
const fs = require('fs-extra');
const path = require('path');

const getFolderNamePkgMap = packageJsonFiles => {
  const folderNamePkgMap = {};
  packageJsonFiles.forEach(pkgJsonPath => {
    const absolutePath = path.resolve(pkgJsonPath);
    const pkgJson = fs.readJSONSync(absolutePath);
    const splitedPaths = absolutePath.split(path.sep);
    const packageFolderName = splitedPaths[splitedPaths.length - 3]; // ex: packages/ricos/web/package.json
    folderNamePkgMap[packageFolderName] = packageFolderName;
  });
  return folderNamePkgMap;
};

const build = async () => {
  const packageJsonFiles = await globby(
    ['packages/**/web/package.json', '!packages/template-atomic-plugin/'],
    { realpath: true }
  );
  const pkgFolderNameMap = {};
  const folderNamePkgMap = getFolderNamePkgMap(packageJsonFiles);
  console.log(folderNamePkgMap);
};

build();
