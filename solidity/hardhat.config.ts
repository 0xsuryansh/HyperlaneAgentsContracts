import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import { exec } from 'child_process';
import fs from 'fs';
import 'hardhat-gas-reporter';
import { task } from 'hardhat/config';
import path from 'path';
import 'solidity-coverage';

task(
  'export-build-artifact',
  'Process and export the hardhat build artifact for SDK consumption',
).setAction(async () => {
  console.log('Finding and processing hardhat build artifact...');

  // find latest build artifact
  const artifactsDir = path.join(__dirname, '/artifacts/build-info');
  const files = fs.readdirSync(artifactsDir);
  const jsonFiles = files.find((file) => file.endsWith('.json'));
  if (!jsonFiles) {
    console.error('Failed to find build artifact');
    return;
  }

  const latestArtifactPath = path.join(artifactsDir, jsonFiles);
  try {
    await new Promise<void>((resolve, reject) => {
      exec(
        `jq -c '{input, solcLongVersion}' ${latestArtifactPath} > ${path.join(
          __dirname,
          'types',
          'buildInfo.json',
        )}`,
        (error, _, stderr) => {
          if (error) {
            reject(error);
            return;
          }
          if (stderr) {
            reject(new Error(stderr));
            return;
          }

          console.log('Finished processing build artifact.');
          resolve();
        },
      );
    });
  } catch (error) {
    console.error('Failed to process build artifact with jq:', error);
  }

  console.log('Updating exports...');
  const typesIndexPath = path.join(__dirname, 'types', 'index.ts');
  try {
    const data = await fs.promises.readFile(typesIndexPath, 'utf8');
    const buildInfoExportString =
      "export { default as BuildInfo } from './buildInfo.json';";
    if (!data.includes(buildInfoExportString)) {
      await fs.promises.appendFile(
        typesIndexPath,
        `${buildInfoExportString}\n`,
        'utf8',
      );
      console.log('Appended BuildInfo export to types/index.ts');
    } else {
      console.log('BuildInfo export already exists in types/index.ts');
    }
  } catch (err) {
    console.error('Failed to read or append to types/index.ts:', err);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 999_999,
      },
    },
  },
  gasReporter: {
    currency: 'USD',
  },
  typechain: {
    outDir: './types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: true,
  },
  mocha: {
    bail: true,
  },
};
