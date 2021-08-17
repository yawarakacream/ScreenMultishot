import { BrowserWindow } from "electron";
import { config, createWindow } from "@/background";
import MainCommunicator from "@/communicator/main-communicator";
import { M2RFrameParameter, R2MFrameParameter } from "./frame-common";

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
    minWidth: 16,
    minHeight: 16,
  });

  window.on("move", () => config.set("frameBounds", window!.getBounds()));
  window.on("resize", () => config.set("frameBounds", window!.getBounds()));

  config.registerWatcher((key) => {
    if (key === "frameStyle") {
      communicator.send("setStyle", config.get("frameStyle"));
    } else if (key === "frameMode") {
      communicator.send("setMode", config.get("frameMode"));
      if (config.get("frameMode") === "freeze") {
        window?.setIgnoreMouseEvents(true, { forward: true });
      } else {
        window?.setIgnoreMouseEvents(false);
      }
    }
  });

  return window;
};

const communicator = new MainCommunicator<R2MFrameParameter, M2RFrameParameter>("frame", {
  getConfig: (key) => config.get(key),
  setConfig: ({ key, value }) => config.set(key, value),
});
