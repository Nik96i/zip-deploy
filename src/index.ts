import { getInput } from '@actions/core';
import { context } from '@actions/github';
import type {AxiosError} from "axios";
import axios from "axios";
import fs from 'fs';

const apiPath = '/post';

interface DeployParams {
    apiHost: string;
    apiToken: string;
    file: fs.ReadStream;
}
interface DeployResponse {
    success: boolean;
    message: string;
}

const axiosClient = axios.create({
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json"
    },
    validateStatus: () => {
        // Don't throw error for 3xx, 4xx, etc.
        return true;
    }
});

async function deploy({ apiHost, apiToken, file }: DeployParams): Promise<DeployResponse> {

    try {

        const formData = new FormData();

        formData.append("token", apiToken);
        formData.append("file", file);
        formData.append("deploy", "true");

        const response = await axiosClient.post(`${apiHost}${apiPath}`, formData);
        
        console.log(response);
        
        return {
            success: true,
            message: "OK"
        }

    } catch (error) {
        const err = error as AxiosError;

        return {
            success: false,
            message: err.message,
        }
    }

    // return {
    //     success: false,
    //     message: "Nothing ...",
    // }

}

async function main(): Promise<void> {

    const inputApiUrl: string = getInput('api');
    const inputApiToken = getInput('token');
    const inputFile = getInput('file');

    // const zipFile = fs.readFileSync(inputFile, 'utf-8');

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
