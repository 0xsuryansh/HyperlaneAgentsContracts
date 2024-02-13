import {
  ChainMap,
  PostDeploymentContractVerifier,
  VerificationInput,
} from '@hyperlane-xyz/sdk';

import { fetchGCPSecret } from '../src/utils/gcloud';
import { readJSONAtPath } from '../src/utils/utils';

import {
  assertEnvironment,
  getArgs,
  withBuildArtifact,
  withNetwork,
} from './agent-utils';
import { getEnvironmentConfig } from './core-utils';

async function main() {
  const { environment, buildArtifact, verificationArtifact, network } =
    await withNetwork(withBuildArtifact(getArgs()))
      .string('verificationArtifact')
      .describe(
        'verificationArtifact',
        'path to hyperlane verification artifact',
      )
      .alias('v', 'verificationArtifact')
      .demandOption('verificationArtifact')
      .demandOption('buildArtifact').argv;

  // set up multiprovider
  assertEnvironment(environment);
  const config = getEnvironmentConfig(environment);
  const multiProvider = await config.getMultiProvider();

  // grab verification artifacts
  const verification: ChainMap<VerificationInput> =
    readJSONAtPath(verificationArtifact);

  // check provided artifact is JSON
  const sourcePath = buildArtifact!;
  if (!sourcePath.endsWith('.json')) {
    throw new Error('Source must be a JSON file.');
  }

  // parse build artifacts for std input json + solc version
  const buildArtifactJson = readJSONAtPath(sourcePath);
  const source = buildArtifactJson.input;
  const solcLongVersion = buildArtifactJson.solcLongVersion;
  const compilerversion = `v${solcLongVersion}`;

  // check solc version is in the right format
  const versionRegex = /v(\d.\d.\d+)\+commit.\w+/;
  const matches = versionRegex.exec(compilerversion);
  if (!matches) {
    throw new Error(`Invalid compiler version ${compilerversion}`);
  }

  // fetch API keys from GCP
  const apiKeys: ChainMap<string> = (await fetchGCPSecret(
    'explorer-api-keys',
    true,
  )) as any;

  // instantiate verifier
  const verifier = new PostDeploymentContractVerifier(
    verification,
    multiProvider,
    apiKeys,
    source,
    {
      compilerversion,
      // MIT license by default
    },
  );

  // verify all the things
  const failedResults = (
    await verifier.verify(network ? [network] : undefined)
  ).filter((result) => result.status === 'rejected');

  // only log the failed verifications to console
  if (failedResults.length > 0) {
    console.error(
      'Verification failed for the following contracts:',
      failedResults.map((result) => result),
    );
    process.exit(1);
  }

  process.exit(0);
}

main().then(console.log).catch(console.error);
