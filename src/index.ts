import { getInput } from '@actions/core';
import { context } from '@actions/github';
import fs from 'fs';

async function main(): Promise<void> {

    const apiUrl: string = getInput('api');
    const apiToken = getInput('token');
    const zipFile = getInput('file');

    const a = fs.readFileSync(zipFile, 'utf-8');

    console.log(apiUrl)
    console.log(apiToken)
    console.log(a)

    // const pullRequest = context;

    console.log(JSON.stringify(context))

}

void main()
