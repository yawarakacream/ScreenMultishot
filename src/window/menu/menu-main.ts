import { BrowserWindow, dialog } from "electron";
import { config, createWindow } from "@/background";
import MainCommunicator from "@/communicator/main-communicator";
import { R2MMenuParameter } from "./menu-common";
import fs from "fs";
import path from "path";
import { EmptyObject, parseDateFormat } from "@/utility";
import { captureDesktop } from "@/desktop-capturer";

let window: BrowserWindow | undefined = undefined;

export const createMenuWindow = async () => {
  if (window) throw new Error();

  window = await createWindow("menu", {
    width: config.get("menuBounds").width,
    height: config.get("menuBounds").height,
    title: "ScreenMultishot",
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
    maximizable: false,
    fullscreenable: false,
    minWidth: 512,
    minHeight: 512,
  });

  window.on("resize", () => {
    const bounds = window!.getBounds();
    config.set("menuBounds", {
      width: bounds.width,
      height: bounds.height,
    });
  });

  return window;
};

new MainCommunicator<R2MMenuParameter, EmptyObject>("menu", {
  getConfig(key) {
    return config.get(key);
  },
  setConfig({ key, value }) {
    config.set(key, value);
  },
  openStorageDirectoryDialog() {
    const directories = dialog.showOpenDialogSync(window!, {
      properties: ["openDirectory"],
    });
    return directories ? directories[0] : null;
  },
  isValidStorageDirectory(path) {
    if (!fs.existsSync(path)) {
      return false;
    }
    try {
      fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch (e) {
      return false;
    }
  },
  onCameraButtonClicked() {
    const directory = config.get("storageDirectory");
    const photoName = config.get("photoName");
    if (!directory) {
      throw new Error("directory is null");
    }
    if (!photoName) {
      throw new Error("photoName is null");
    }

    const file = path.resolve(directory, parseDateFormat(photoName, new Date()));
    (async () => {
      const { x, y, width, height } = config.get("frameBounds");
      const { size } = config.get("frameStyle");
      await captureDesktop(file, {
        x: x + size,
        y: y + size,
        width: width - size * 2,
        height: height - size * 2,
      });
    })();
  },
});
