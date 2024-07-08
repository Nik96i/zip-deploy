import { setFailed } from "@actions/core";
// import { context, getOctokit } from '@actions/github';
import { canReadFile, getDeploy, getFilePath, getHostName, getTag, getToken, readFile } from "@/utils";
import { deploySite } from "@/api";

async function main(): Promise<void> {
  try {
    const inputHostname = getHostName();

    if (inputHostname === null) {
      setFailed("Invalid hostname");
      return;
    }

    const inputToken = getToken();

    if (inputToken === null) {
      setFailed("Invalid token");
      return;
    }

    const inputTag = getTag();

    if (inputTag === null) {
      setFailed("Invalid tag");
      return;
    }

    const inputFilePath = getFilePath();

    if (inputFilePath === null) {
      setFailed("Invalid filepath");
      return;
    }

    const inputDeploy = getDeploy();
    const fileAccess = await canReadFile(inputFilePath);

    if (!fileAccess) {
      setFailed("Cannot read file");
      return;
    }

    const file = await readFile(inputFilePath);

    if (file === null) {
      setFailed("Failed to read file");
      return;
    }

    const result = await deploySite({
      apiHost: inputHostname,
      apiToken: inputToken,
      tag: inputTag,
      file: file,
      deploy: inputDeploy
    });

    if (!result.success) {
      setFailed(`Failed to deploy file: ${inputFilePath}`);
      return;
    }

    console.log(`Successfully deployed: ${inputFilePath}`);
  } catch (error) {
    const err = error as Error;

    setFailed(err.message);
  }
}

void main();
