import packageJson from "../../package.json";

export async function requestInterceptor(config: any) {
  const headers = { ...(config.headers ?? {}) };

  headers["Content-Type"] = "application/json";
  headers["X-Platform-Version"] = packageJson.version;
  headers["X-Surface"] = "CHECKOUT_PORTAL";

  try {
    headers[
      "Authorization"
    ] = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyNnJJNmJPaDQzblRwdWNtaVdkT2VoVjVreEhzemM3MFMwVHZPQmRfNFdFIn0.eyJleHAiOjE3Njc4NjE0OTMsImlhdCI6MTc2NTI2OTQ5MywianRpIjoib25ydHJvOjA0YjYzZGZlLThhOTUtYjlkOC03MGFmLWUwMDA0OWI3MjI3YSIsImlzcyI6Imh0dHBzOi8va2V5Y2xvYWsuZGV2Lm1hZGEtam8uY29tL3JlYWxtcy9ibnBsLWRldi1yZWFsbSIsImF1ZCI6ImFkbWluLWNsaSIsInN1YiI6ImVkN2JkNmRkLTY5ODItNGYzMi1iYmYzLTlmODkxY2M1MTJkNCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNlc3Npb24tcHJvdmlkZXIiLCJzaWQiOiJmNDljYzQ0ZC1lZjk2LTQ5MDQtOGFjOC0zZTg0N2ZkYWMxOTYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsIkNVU1RPTUVSIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWJucGwtZGV2LXJlYWxtIl19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNWZXJpZmllZCI6IjAiLCJyZWdpc3RyYXRpb25JZCI6IjYwNDZkYzVjLWJiMTctNGY1OC04ZDdlLTM4ZmRmOWQ3OWJkYiIsInByZWZlcnJlZF91c2VybmFtZSI6Iis5NjI3OTA5NDA5NjYiLCJlbWFpbCI6Imhhc2Fub21hcmkxNUBnbWFpbC5jb20ifQ.W6XQs-EKEn61jECH00WvLxBR-eT8nmL5I0Q-uuds7Np0CtROuTOSWxxXWHEuNPTyHl2rRuE3dE_RwsgE40jRokhYzii7oNNyFCOrvqSq_FrkxcBf45BSUGPuf229Ifib5rfKBzIOmDnRXu-zB4l2-OmHud5N79DY1FtK6C4oQUoCwjDlGgmLSBCo-hLaDGS48T3Iz4Nb9g43vCrEUQPyZL6KcRI2x6izCfIOGS_mmOP5HwsQhMQN4Ke7lg0--1tLVZwb_q0F-_h3rciNX7_XkW7FssvYi4X01WtyFiGw2j7f5RdTWSFqHE_D4HpgOpma7-4ZLQ9G9APGwQkkfiLV_Q
 `;
    headers["channel"] = "online";
  } catch (err) {
    console.warn("Failed to retrieve auth token:", err);
  }

  config.headers = headers;
  return config;
}
