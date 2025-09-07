type AppEnvConfig = {
  BASE_URL: string;
  API_PREFIX: string;
  FILE_PREFIX: string;
};

export const APP_ENV_CONFIG: AppEnvConfig = {
  development: {
    BASE_URL: "http://192.168.31.246:3000",
    API_PREFIX: "",
    FILE_PREFIX: "",
  },
  production: {
    BASE_URL: "http://localhost:3000",
    API_PREFIX: "",
    FILE_PREFIX: "",
  },
}[process.env.NODE_ENV];
