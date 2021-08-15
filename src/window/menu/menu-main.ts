import { BrowserWindow } from "electron";
import { createWindow } from "@/background";
import MainCommunicator from "@/communicator/main-communicator";

let window: BrowserWindow | undefined = undefined;

export const createMenuWindow = async () => {
  window = await createWindow("menu", {
    width: 512,
    height: 512,
    title: "ScreenMultishot",
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
    maximizable: false,
    fullscreenable: false,
    minWidth: 512,
    minHeight: 512,
  });
};
