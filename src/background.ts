import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import { createFrameWindow } from "./window/frame/frame-main";
import { createMenuWindow } from "./window/menu/menu-main";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);

export const createWindow = async (url: string, options: Electron.BrowserWindowConstructorOptions) => {
  const win = new BrowserWindow(options);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL((process.env.WEBPACK_DEV_SERVER_URL as string) + url);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    win.loadURL("app://./" + url);
  }
  win.focus();
  return win;
};

app.on("window-all-closed", () => app.quit());

app.on("ready", async () => {
  // await createFrameWindow();
  await createMenuWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") app.quit();
    });
  } else {
    process.on("SIGTERM", () => app.quit());
  }
}
