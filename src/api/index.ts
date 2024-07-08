import type { AxiosError } from "axios";
import { axiosClient } from "@/lib";
import { errorCodes } from "@/api/constants";

// Constants
// const apiPrefix = "/api/v1";
const apiPrefix = "";

// Type Definitions
interface ApiResponse {
  code: number;
  desc: string;
  data: object;
}
interface DeployParams {
  apiHost: string;
  apiToken: string;
  tag: string;
  deploy: boolean;
  file: Blob | string;
}
interface DeployResponse {
  success: boolean;
  message: string;
}

/**
 * Deploy zip file to hosting
 * @param apiHost
 * @param apiToken
 * @param tag
 * @param deploy
 * @param file
 */
async function deploySite({ apiHost, apiToken, tag, deploy, file }: DeployParams): Promise<DeployResponse> {
  try {
    const formData = new FormData();

    formData.append("key", apiToken);
    formData.append("tag", tag);
    formData.append("file", file);
    formData.append("deploy", deploy.toString());

    const response = await axiosClient.post<ApiResponse>(`https://${apiHost}${apiPrefix}/post`, formData);
    const statusCode = response.status;

    if (statusCode === 200) {
      // For Dev
      return {
        success: true,
        message: "OK"
      };

      // return {
      //   success: response.data.code === 0,
      //   message: errorCodes[response.data.code as keyof typeof errorCodes]
      // };
    }

    return {
      success: false,
      message:
        statusCode === 400
          ? "Bad Request"
          : statusCode === 500
            ? "Internal Server Error"
            : statusCode === 401
              ? "Unauthorized"
              : `Request Error ${statusCode}`
    };
  } catch (error) {
    const err = error as AxiosError;

    return {
      success: false,
      message: err.message
    };
  }
}

export { deploySite };
