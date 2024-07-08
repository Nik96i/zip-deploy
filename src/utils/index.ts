import fs from "fs";
import { URL } from "url";
import { getInput } from "@actions/core";

const tokenRegex = new RegExp(/^[\w\s.-]{64}$/);
const tagRegex = new RegExp(/^[\w\s.-]{1,64}$/);
const deployRegex = new RegExp(/^(true|false)$/);

async function canReadFile(filePath: string): Promise<boolean> {
  return new Promise(function (resolve) {
    fs.access(filePath, fs.constants.R_OK, (err) => {
      resolve(err === null);
    });
  });
}

async function readFile(filePath: string): Promise<string | null> {
  return new Promise(function (resolve) {
    fs.readFile(filePath, "utf8", (err, data) => {
      resolve(err === null ? data : null);
    });
  });
}

function getHostName(): string | null {
  try {
    const url = new URL(getInput("host"));

    return url.hostname;
  } catch (_) {
    /* empty */
  }

  return null;
}

function getToken(): string | null {
  console.log(getInput("token"))
  return tokenRegex.test(getInput("token")) ? getInput("token") : null;
}

function getTag(): string | null {
  return tagRegex.test(getInput("tag")) ? getInput("tag") : null;
}

function getDeploy(): boolean {
  return deployRegex.test(getInput("deploy")) ? getInput("deploy") === "true" : false;
}

function getFilePath(): string | null {
  return getInput("file").length > 4 && getInput("file").endsWith(".zip") ? getInput("file") : null;
}

export { canReadFile, readFile, getHostName, getToken, getTag, getDeploy, getFilePath };
