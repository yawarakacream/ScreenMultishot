import { app, protocol, BrowserWindow, dialog } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import { ConfigContainer } from "./config/config-container";
import { captureDesktopAsBytes, hasCapturePermission } from "./desktop-capturer";
import { isDevelopment } from "./utility";
import { createFrameWindow } from "./window/frame/frame-main";
import { createMenuWindow } from "./window/menu/menu-main";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);

export const config = new ConfigContainer();

export const createWindow = async (url: string, options: Electron.BrowserWindowConstructorOptions) => {
  const win = new BrowserWindow(options);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL((process.env.WEBPACK_DEV_SERVER_URL as string) + url);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // win.loadURL("app://./" + url);
    win.loadURL(`file://${__dirname}/index.html#${url}`);
    // win.webContents.openDevTools();
  }
  win.focus();
  return win;
};

app.on("window-all-closed", () => app.quit());

let frame: BrowserWindow;
let menu: BrowserWindow;

app.on("ready", async () => {
  if (!hasCapturePermission()) {
    dialog.showErrorBox("エラー", "スクリーンショットを撮影する権限がありません。");
    // Electron でも screenshot-desktop でも権限確認画面が出せないので，一度撮影してむりやり出す
    await captureDesktopAsBytes();
    app.quit();
    return;
  }

  frame = await createFrameWindow();
  menu = await createMenuWindow();

  menu.on("closed", () => {
    frame.destroy();
    app.quit();
  });
});

app.on("before-quit", () => config.save());

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") app.quit();
    });
  } else {
    process.on("SIGTERM", () => app.quit());
  }
}
