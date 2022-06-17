import webpack from 'webpack';
import chalk from 'chalk';
export { getWebpackConfig } from './webpack.common';

function getWebpackErrorString(err: webpack.WebpackError, stats: webpack.MultiStats) {
  if (err) {
    if (err.details) {
      return err.details;
    }
  }
  if (stats.hasErrors()) {
    return stats.toString('errors-only');
  }
}

const removeJsExtension = (fileName: string) => fileName.slice(0, -3);

export function multiStatsToBundlesSizes(
  multiStats: webpack.MultiStats,
  bundlesNames: string[]
): Record<string, number> {
  const sizes: { [bundleName: string]: number } = {};
  multiStats.stats.forEach(stat => {
    const asset = stat.toJson().assets.find(a => bundlesNames.includes(removeJsExtension(a.name)));
    sizes[removeJsExtension(asset.name)] = Math.round(asset.size / 1024);
  });
  return sizes;
}

export function runWebpack(config): Promise<webpack.MultiStats> {
  // eslint-disable-next-line no-console
  console.log(chalk.red.bold('Compiling. Can take a long time!!!'));
  return new Promise(res => {
    webpack(config, (err: webpack.WebpackError, multiStats: webpack.MultiStats) => {
      const errorString = getWebpackErrorString(err, multiStats);
      if (errorString) {
        console.error(chalk.red(errorString));
        process.exit(1);
      }
      res(multiStats);
    });
  });
}
