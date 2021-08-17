import { BrowserWindow, dialog } from "electron";
import { config, createWindow } from "@/background";
import MainCommunicator from "@/communicator/main-communicator";
import { MenuParameter } from "./menu-common";
import fs from "fs";

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
};

new MainCommunicator<MenuParameter>("menu", {
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
    console.log("a");
    try {
      fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
      console.log("b");
      return true;
    } catch (e) {
      console.log("c");
      return false;
    }
  },
});
