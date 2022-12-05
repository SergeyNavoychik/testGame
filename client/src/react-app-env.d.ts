/// <reference types="react-scripts" />
declare module "*.mp3" {
  const src: string;
  export default src;
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_SOCKET_URL: string;
  }
}
