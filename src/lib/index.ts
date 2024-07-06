import axios from "axios";

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

export { axiosClient };
