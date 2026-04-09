declare interface Window extends globalThis.Window {
  env: {
    APPID: string;
    BASE_URL: string;
    API_PREFIX: string;
    FILE_PREFIX: string;
  };
}
