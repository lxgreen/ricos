import { getBundlesSize } from './utils/getBundlesSize';
import fs from 'fs';

async function main() {
  const bundlesSizes = await getBundlesSize();
  const fileName = 'bundlesSizesBaseline';

  fs.writeFile(`${fileName}.json`, JSON.stringify(bundlesSizes, null, 2), err => {
    if (err) throw err;
  });
}

main();
