/* eslint-disable no-console */
import chalk from 'chalk';
import type webpack from 'webpack';
import { getWebpackConfig, runWebpack, multiStatsToBundlesSizes } from './webpack';
import { argv } from 'yargs';
const fs = require('fs');

process.on('unhandledRejection', error => {
  throw error;
});

const getBundlesNames = (): string[] => {
  const firstArg = argv._[0];
  return firstArg ? [firstArg] : fs.readdirSync('./src/bundles/').map(f => f.slice(0, -4));
};

const bundleNameToWebpackConfig = (bundleName: string): webpack.Configuration => {
  const entry = { [bundleName]: `./src/bundles/${bundleName}.tsx` };
  return getWebpackConfig(entry);
};

function printBundlesSizes(bundlesSizes: Record<string, number>) {
  Object.entries(bundlesSizes).forEach(([bundleName, size]) => {
    const prefix = chalk.cyan(`[${bundleName}]`);
    const colorIt = size > 500 ? chalk.red : size > 250 ? chalk.yellow : chalk.green;
    console.log(prefix, colorIt(`${size}KB`));
  });
}

export async function getBundlesSize(): Promise<Record<string, number>> {
  const bundlesNames = getBundlesNames();
  const webpackConfigs = bundlesNames.map(bundleNameToWebpackConfig);

  const multiStats = await runWebpack(webpackConfigs);

  const bundlesSizes = multiStatsToBundlesSizes(multiStats, bundlesNames);

  printBundlesSizes(bundlesSizes);

  return bundlesSizes;
}
