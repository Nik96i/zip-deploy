import { getInput, setFailed } from "@actions/core";
// import { context, getOctokit } from '@actions/github';
import fs from "fs";
import { deploy } from "./api";
import { canReadFile } from "./utils";

async function main(): Promise<void> {
  const inputApiUrl = getInput("api");
  const inputApiToken = getInput("token");
  const inputFile = getInput("file");

  try {
    const fileAccess = await canReadFile(inputFile);

    if (!fileAccess) {
      throw new Error(`Cannot read file: ${inputFile}`);
    }

    const result = await deploy({
      apiHost: inputApiUrl,
      apiToken: inputApiToken,
      file: fs.createReadStream(inputFile)
    });

    if (!result.success) {
      throw new Error(`Failed to deploy file: ${inputFile}`);
    }

    console.log("Successfully deployed!");
  } catch (error) {
    const err = error as Error;

    setFailed(err.message);
  }
}

void main();
