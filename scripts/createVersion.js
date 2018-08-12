/* eslint-disable no-console */

process.on('unhandledRejection', error => {
  throw error;
});

const path = require('path');
const cp = require('child_process');
const chalk = require('chalk');
const prompts = require('prompts');
const argv = require('yargs').argv;
const pkg = require('../package.json');

const lernaPath = path.resolve(__dirname, '../node_modules/.bin/lerna');
const scope = argv.scope || 'wix-rich-content-*';
const force = argv.force || false;

// resets the console
process.stdout.write('\x1Bc');

console.log(chalk.underline(`Starting the release process for ${pkg.name}`));
console.log();

prompts({
  type: 'confirm',
  name: 'value',
  initial: false,
  message: 'Did you remember to update changelog with the new version?',
}).then(({ value }) => {
  if (!value) {
    console.log();
    console.log(chalk.cyan('So do it now 👇'));
    console.log();
    console.log(path.resolve(__dirname, '../CHANGELOG.md'));
    console.log();
    console.log(chalk.red('Release aborted'));
  } else {
    try {
      let lernaCmd = `${lernaPath} version --no-commit-hooks --message="version bump:"`;
      if (argv.force) {
        let forceFlag = '--force-publish';
        if (typeof argv.force === 'string') {
          forceFlag = `${forceFlag}=${argv.force}`;
        }
        lernaCmd = `${lernaCmd} ${forceFlag}`;
      }
      if (argv.version) {
        lernaCmd = `${lernaCmd} ${argv.version}`;
      }
      cp.execSync(lernaCmd, { stdio: 'inherit' });
    } catch (error) {
      throw error;
    }
  }
});
