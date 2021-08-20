import { app, BrowserWindow, dialog } from "electron";
import { config, createWindow } from "@/background";
import MainCommunicator from "@/communicator/main-communicator";
import { M2RMenuParameter, R2MMenuParameter } from "./menu-common";
import fs from "fs";
import path from "path";
import { parseDateFormat } from "@/utility";
import { captureDesktop } from "@/desktop-capturer";
import { createPdf } from "@/pdf-creator";

let window: BrowserWindow | undefined = undefined;

let storageFileWatcher: fs.FSWatcher | null = null;
const createStorageWatchers = () => {
  storageFileWatcher?.close();
  const directory = config.get("storageDirectory");
  if (!directory) {
    return;
  }
  storageFileWatcher = fs.watch(directory);
  storageFileWatcher.on("change", () => communicator.send("onStorageFileUpdate", fs.readdirSync(directory)));
};

export const createMenuWindow = async () => {
  if (window) {
    throw new Error();
  }

  window = await createWindow("menu", {
    width: config.get("menuBounds").width,
    height: config.get("menuBounds").height,
    title: "ScreenMultishot",
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      webSecurity: process.env.NODE_ENV !== "development",
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

  createStorageWatchers();

  config.registerWatcher((key) => {
    if (key === "storageDirectory") {
      const directory = config.get("storageDirectory");
      communicator.send("onStorageUpdate", directory);
      if (directory) {
        createStorageWatchers();
      }
    }
  });

  return window;
};

const communicator = new MainCommunicator<R2MMenuParameter, M2RMenuParameter>("menu", {
  getConfig: (key) => config.get(key),
  setConfig: ({ key, value }) => config.set(key, value),

  openStorageDirectoryDialog() {
    const selected = dialog.showOpenDialogSync(window!, { properties: ["openDirectory"] });
    if (!selected) {
      return;
    }
    try {
      fs.accessSync(selected[0], fs.constants.W_OK | fs.constants.R_OK);
      config.set("storageDirectory", selected[0]);
    } catch (e) {
      // do nothing.
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

    (async () => {
      let accessible = true;
      try {
        fs.accessSync(directory);
      } catch (e) {
        accessible = false;
      }

      const file = path.resolve(accessible ? directory : process.cwd(), parseDateFormat(photoName, new Date()));
      const { x, y, width, height } = config.get("frameBounds");
      const { size } = config.get("frameStyle");
      await captureDesktop(file, {
        x: x + size,
        y: y + size,
        width: width - size * 2,
        height: height - size * 2,
      });

      if (!accessible) {
        dialog.showErrorBox(
          "エラー",
          "保存先に指定されたフォルダが存在しません。\nアプリの存在するフォルダに保存しました。"
        );
        config.set("storageDirectory", null);
      }
    })();
  },

  onPdfButtonClicked({ photos }) {
    const directory = config.get("storageDirectory");
    const pdfName = config.get("pdfName");
    if (!directory) {
      throw new Error("directory is null");
    }
    if (!pdfName) {
      throw new Error("pdfName is null");
    }

    (async () => {
      let accessible = true;
      try {
        fs.accessSync(directory);
      } catch (e) {
        accessible = false;
      }

      const file = path.resolve(accessible ? directory : process.cwd(), parseDateFormat(pdfName, new Date()));
      await createPdf(
        file,
        photos.map((p) => `${directory}/${p}`)
      );

      communicator.send("setPdfAvailableOnMain", undefined);

      if (!accessible) {
        dialog.showErrorBox(
          "エラー",
          "保存先に指定されたフォルダが存在しません。\nアプリの存在するフォルダに保存しました。"
        );
        config.set("storageDirectory", null);
      }
    })();
  },

  getStorageFiles() {
    const directory = config.get("storageDirectory");
    return directory ? fs.readdirSync(directory) : null;
  },
});
