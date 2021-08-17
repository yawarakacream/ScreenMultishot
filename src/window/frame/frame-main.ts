import { BrowserWindow } from "electron";
import { config, createWindow } from "@/background";
import MainCommunicator from "@/communicator/main-communicator";
import { FrameParameter } from "./frame-common";

let window: BrowserWindow | undefined = undefined;

export const createFrameWindow = async () => {
  const bounds = config.get("frameBounds");
  window = await createWindow("frame", {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x != -1 ? bounds.x : undefined,
    y: bounds.y != -1 ? bounds.y : undefined,
    webPreferences: {
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

  window.on("move", () => config.set("frameBounds", window!.getBounds()));
  window.on("resize", () => config.set("frameBounds", window!.getBounds()));

  return window;
};

new MainCommunicator<FrameParameter>("frame", {
  getConfig(key) {
    return config.get(key);
  },
  setConfig({ key, value }) {
    config.set(key, value);
  },
  onFrame: (value) => {
    if (value) {
      window?.setIgnoreMouseEvents(false);
    } else {
      window?.setIgnoreMouseEvents(true, { forward: true });
    }
  },
});
