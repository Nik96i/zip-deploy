import { getInput } from "@actions/core";
// import { context, getOctokit } from '@actions/github';

async function main(): Promise<void> {
  const inputApiHost = getInput("host");
  const inputApiToken = getInput("token");
  const inputFile = getInput("file");
  const inputDeploy = getInput("deploy");

  console.log(typeof inputApiHost)
  console.log(typeof inputApiToken)
  console.log(typeof inputFile)
  console.log(inputDeploy)

  //
  //
  // try {
  //   const fileAccess = await canReadFile(inputFile);
  //
  //   if (!fileAccess) {
  //     throw new Error(`Cannot read file: ${inputFile}`);
  //   }
  //
  //   const result = await deploy({
  //     apiHost: inputApiUrl,
  //     apiToken: inputApiToken,
  //     file: fs.createReadStream(inputFile)
  //   });
  //
  //   if (!result.success) {
  //     throw new Error(`Failed to deploy file: ${inputFile}`);
  //   }
  //
  //   console.log("Successfully deployed!");
  // } catch (error) {
  //   const err = error as Error;
  //
  //   setFailed(err.message);
  // }
}

void main();
