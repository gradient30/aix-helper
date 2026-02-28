export const APP_VERSION = import.meta.env.VITE_APP_VERSION || "0.0.0";
export const APP_BUILD = import.meta.env.VITE_APP_BUILD || "dev";
export const APP_VERSION_DISPLAY = import.meta.env.VITE_APP_VERSION_DISPLAY || `v${APP_VERSION}+${APP_BUILD}`;
