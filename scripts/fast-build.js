/* eslint-disable prettier/prettier */
const path = require('path');
const cp = require('child_process');

const lernaPath = path.resolve(__dirname, '../node_modules/.bin/lerna');
const ultra = path.resolve(__dirname, '../node_modules/.bin/ultra');

cp.execSync(
    `${ultra} --filter '+wix-rich-content-@(common|editor|viewer)' --color=false -r  -d build`,
    { stdio: 'inherit' }
);
