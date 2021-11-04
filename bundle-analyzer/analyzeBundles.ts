/* eslint-disable no-console */
import chalk from 'chalk';
import webpack from 'webpack';
import { getWebpackPluginConfig } from './webpack.common';
import { argv } from 'yargs';
const fs = require('fs');

process.on('unhandledRejection', error => {
  throw error;
});

const warning = chalk.keyword('orange');

type IncludePluginsOptions = { bundleOnly?: string };

const getAllPluginsNames = ({ bundleOnly }: IncludePluginsOptions): string[] => {
  if (bundleOnly) {
    return [bundleOnly];
  }

  return fs.readdirSync('./src/bundles/').map(f => f.slice(0, -4));
};

const options: IncludePluginsOptions = {};
const firstArg = argv._[0];
if (firstArg) {
  console.log('bundling only', firstArg);
  options.bundleOnly = firstArg;
}

export async function analyze() {
  const sizesObject: Record<string, number> = {};
  console.log(chalk.magenta('Analyzing plugins...'));
  const pkgNames = await getAllPluginsNames(options);

  const bundleResultsPromise = pkgNames.map(pkgName => {
    return new Promise(resolve => {
      webpack(getWebpackPluginConfig(pkgName), (err, stats) => {
        // Stats Object
        if (err || stats.hasErrors()) {
          const _err: string = err || stats.compilation.errors[0];
          console.error(chalk.red(_err));
          resolve({ name: pkgName, error: _err });
        } else {
          resolve({
            name: pkgName,
            size: Math.ceil(
              stats.toJson(true).assets.find(({ name }) => name === `${pkgName}.js`).size / 1024
            ),
          });
        }
      });
    });
  });

  await Promise.all(bundleResultsPromise).then(results => {
    results.forEach((result: { name: string; size?: number; error?: string }) => {
      const { size, name, error } = result;
      const prefix = chalk.cyan(`[${name}]`);
      if (error) {
        console.log(prefix, chalk.red(`Error! ${error}`));
        process.exit(1);
      } else {
        const chlk = size > 500 ? warning : size > 250 ? chalk.yellow : chalk.green;
        console.log(prefix, chlk(`${size}KB`));
        sizesObject[name] = size;
      }
    });
  });

  return sizesObject;
}
