import { getInput } from '@actions/core';

const api = getInput('api');

console.log(`Hello ${api}!`);
