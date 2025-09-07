import { defineConfig } from "@hey-api/openapi-ts";
import { APP_ENV_CONFIG } from "./src/common";

export default defineConfig({
  // input: `${APP_ENV_CONFIG.BASE_URL}/api-json`,
  input: "http://127.0.0.1:4523/export/openapi/2?version=3.0",
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
    "@hey-api/schemas",
    {
      dates: true,
      name: "@hey-api/transformers",
    },
    {
      enums: "javascript",
      name: "@hey-api/typescript",
    },
    {
      name: "@hey-api/sdk",
      transformer: true,
    },
  ],
});
