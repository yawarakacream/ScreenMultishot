import { BrowserWindow } from "electron";
import { createWindow } from "@/background";
import MainCommunicator from "@/communicator/main-communicator";
import { FrameParameter } from "./frame-common";

let window: BrowserWindow | undefined = undefined;

export const createFrameWindow = async () => {
  window = await createWindow("frame", {
    width: 200,
    height: 200,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
    alwaysOnTop: true,
    frame: false,
    hasShadow: false,
    transparent: true,
    maximizable: false,
    minimizable: false,
    closable: false,
    fullscreenable: false,
    roundedCorners: false,
    thickFrame: false,
    acceptFirstMouse: true,
  });

  window.on("move", (event: Electron.Event) => {
    const bounds = window!.getBounds();
  });
};

const communicator = new MainCommunicator<FrameParameter>("frame", {
  onFrame: (value) => {
    if (value) {
      window?.setIgnoreMouseEvents(false);
    } else {
      window?.setIgnoreMouseEvents(true, { forward: true });
    }
    console.log(value);
  },
});
