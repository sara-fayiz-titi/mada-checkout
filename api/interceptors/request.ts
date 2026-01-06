import packageJson from "../../package.json";

export async function requestInterceptor(config: any) {
  const headers = { ...(config.headers ?? {}) };

  headers["Content-Type"] = "application/json";
  headers["X-Platform-Version"] = packageJson.version;
  headers["X-Surface"] = "CHECKOUT_PORTAL";

  try {
    headers[
      "Authorization"
    ] = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRajgxQ3g3NkdNMGpxOE93bzlJNl81M2FGZ3NzbUI2ejM3ZGhUUEs3UndrIn0.eyJleHAiOjE3Njc3NDI1MzgsImlhdCI6MTc2NzcwNjUzOCwianRpIjoib25ydHJvOmZlOTMyMmI5LWE2MTctMGExZi1jNTEyLTAzZjk0ODUyNDk5YyIsImlzcyI6Imh0dHBzOi8va2V5Y2xvYWsuc3RnLm1hZGEtYm5wbC5jb20vcmVhbG1zL21hZGEtbWVyY2hhbnRzLXJlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijk2NzFlMGY4LWNjZWYtNGMxMi05NGYzLTI5YTFjNDljOWE5NCIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1lcmNoYW50LXNlc3Npb24tcHJvdmlkZXIiLCJzaWQiOiI3MDgzNjEyNS02OGRlLTRhOWMtYjVmYi0yNzBiZGEzMGI5MjYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtbWFkYS1tZXJjaGFudHMtcmVhbG0iLCJ1bWFfYXV0aG9yaXphdGlvbiIsIk1FUkNIQU5UIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwYXJlbnRfc2NvcGUgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc1ZlcmlmaWVkIjoiMCIsInByZWZlcnJlZF91c2VybmFtZSI6Iis5NjI3ODk1NDE3ODYiLCJlbWFpbCI6ImFsaS5xYXNlbUBtYWRhLWpvLmNvbSJ9.w10pNM4HCVQNN9M-I4hnFuRqTCMcsnVGkNj-Vl7NwZaDqlK4Pqx6VOZNkv_IY8zkTebhG0mRi7gBsCDiC_NgiAydBEUpalxR7c_WLPoxn78j-IGDTA7sVSSrmA5FX1nEBAzswyH1xjokx_JcCOro7a2hf4Zc7L4OdrB3bL00v3QYawubJlyZJCXOwPxDhCmoyRhp_KIfZFOOQrfOZJAAUs9emMd8ipLErPBPOJzfkGOW1GY6XcbMlUUvWxB4SSJvhCS4gZI9uvUMify8B-bZw0Dfg8uSzyRDcS6DlMP9I8fs_E5c6m1va0MZpXaKTgzXyLQuxvCPAxsepeW8-hFvTw`;
    headers["channel"] = "online";
  } catch (err) {
    console.warn("Failed to retrieve auth token:", err);
  }

  config.headers = headers;
  return config;
}
