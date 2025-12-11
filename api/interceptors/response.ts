export async function responseInterceptor(error: any) {
  return Promise.reject(error);
}
