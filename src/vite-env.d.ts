/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_BUILD: string;
  readonly VITE_APP_VERSION_DISPLAY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
