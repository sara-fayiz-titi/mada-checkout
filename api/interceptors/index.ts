import { requestInterceptor } from "./request";
import { responseInterceptor } from "./response";

export function setupInterceptors(instance: any) {
  instance.interceptors.request.use(requestInterceptor);
  instance.interceptors.response.use(
    (response: any) => response,
    responseInterceptor
  );
}
