import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  // input: `${APP_ENV_CONFIG.BASE_URL}/api-json`,
  input: "http://127.0.0.1:4523/export/openapi/24?version=3.0",
  output: {
    format: "prettier",
    lint: "eslint",
    path: "./src/client",
  },
  plugins: [
    {
      name: "@hey-api/client-axios",
      runtimeConfigPath: "./src/hey-api.ts",
    },
  ],
});
