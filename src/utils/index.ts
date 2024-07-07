import fs from "fs";

async function canReadFile(filePath: string): Promise<boolean> {
  return new Promise(function (resolve) {
    fs.access(filePath, fs.constants.R_OK, (err) => {
      resolve(err === null);
    });
  });
}

function isValidInput(input: string): boolean {
  return input.length === 0;
}

export { canReadFile, isValidInput };
