import { argv } from 'yargs';
import chalk from 'chalk';
import { getWebpackConfig, runWebpack } from './utils/webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

process.on('unhandledRejection', error => {
  throw error;
});

const bundleName = argv._[0];

if (!bundleName) {
  console.error(chalk.red('Must supply bundle name')); //eslint-disable-line
} else {
  console.log(chalk.magenta(`Analyzing ${bundleName} bundle...`)); //eslint-disable-line
  const entry = { [bundleName]: `./src/bundles/${bundleName}.tsx` };
  const config = getWebpackConfig(entry, [new BundleAnalyzerPlugin({ analyzerPort: 'auto' })]);
  runWebpack(config);
}
