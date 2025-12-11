import axios from "axios";
import { setupInterceptors } from "./interceptors";

const API_TIMEOUT = 15000;

const createInstance = (baseURL: any) => {
  const instance = axios.create({
    baseURL,
    timeout: API_TIMEOUT,
    withXSRFToken: true,
    headers: {
      // Accept: "application/json",
    },
  });

  setupInterceptors(instance);
  return instance;
};

export const madaInstance = createInstance("https://api.dev.mada-jo.com/");
export const cmsInstance = createInstance("https://cms.dev.mada-jo.com/");
