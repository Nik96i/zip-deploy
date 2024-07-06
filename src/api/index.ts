import type fs from "fs";
import type { AxiosError } from "axios";
import { axiosClient } from "../lib";

// Constants
const apiPath = "/post";

// Type Definitions
interface DeployParams {
  apiHost: string;
  apiToken: string;
  file: fs.ReadStream;
}
interface DeployResponse {
  success: boolean;
  message: string;
}

/**
 * Deploy zip file to hosting
 * @param apiHost
 * @param apiToken
 * @param file
 */
async function deploy({ apiHost, apiToken, file }: DeployParams): Promise<DeployResponse> {
  try {
    const formData = new FormData();

    formData.append("token", apiToken);
    formData.append("file", file);
    formData.append("deploy", "true");

    const response = await axiosClient.post(`${apiHost}${apiPath}`, formData);
    const statusCode = response.status;

    if (statusCode === 200) {
      return {
        success: true,
        message: "OK"
      };
    }
  } catch (error) {
    const err = error as AxiosError;

    return {
      success: false,
      message: err.message
    };
  }

  return {
    success: false,
    message: "Nothing ..."
  };
}

export { deploy };
