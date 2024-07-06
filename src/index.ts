import { getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import fs from 'fs';
import {deploy} from "./api";

async function main(): Promise<void> {

    const inputApiUrl = getInput('api');
    const inputApiToken = getInput('token');
    const inputFile = getInput('file');

    try {

        fs.access(inputFile, fs.constants.R_OK, (err) => {

            if (err !== null) {
                throw new Error(`Cannot read file: ${inputFile}`);
            }

        });

    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        setFailed((error as Error).message ?? 'Unknown error');
        return;
    }

    const result = await deploy({
        apiHost: inputApiUrl,
        apiToken: inputApiToken,
        file: fs.createReadStream(inputFile),
    });

    console.log(result)

    // const pullRequest = context;

    console.log(JSON.stringify(context))

}

void main()
