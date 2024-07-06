import { context } from '@actions/github';

async function main(): Promise<void> {

    // const pullRequest = context;

    console.log(JSON.stringify(context))

}

void main()
