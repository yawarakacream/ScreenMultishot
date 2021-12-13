import { config } from "@/background";
import { isDevelopment } from "@/utility";
import { FrameModes } from "@/window/frame/frame-common";
import { app } from "electron";
import fs from "fs";
import path from "path";
import { Config, isConfig } from "./config";

if (!app.getPath("userData").includes("screen-multishot")) {
  app.quit();
  throw new Error();
}

const configFilePath = path.resolve(app.getPath("userData"), "config.json");
const encoding = "utf8";

export class ConfigContainer {
  private config: Config;
  private watchers: ((key: keyof Config) => void)[];

  constructor() {
    this.watchers = [];

    if (fs.existsSync(configFilePath)) {
      const read = JSON.parse(fs.readFileSync(configFilePath, encoding));
      if (isConfig(read)) {
        this.config = read;
        return;
      }
    }
    this.config = this.getDefault();
    this.save();
  }

  private getDefault() {
    const storageDirectory = path.resolve(app.getPath("pictures"), "./ScreenMultishot");
    if (!fs.existsSync(storageDirectory)) {
      fs.mkdirSync(storageDirectory);
    }

    return {
      version: 1,
      menuBounds: {
        width: 512,
        height: 512,
      },
      frameBounds: {
        x: -1,
        y: -1,
        width: 256,
        height: 256,
      },
      frameStyle: {
        rgb: "#000000",
        alpha: 50,
        size: 4,
      },
      frameMode: FrameModes[0],
      storageDirectory,
      photoName: "$year-$month-$day $hours-$minutes-$seconds",
      pdfName: "$year-$month-$day $hours-$minutes-$seconds",
    };
  }

  save() {
    fs.writeFileSync(configFilePath, JSON.stringify(this.config, null, 2), encoding);
  }

  get<K extends keyof Config>(key: K): Config[K] {
    return this.config[key];
  }

  set<K extends keyof Config>(key: K, value: Config[K]) {
    this.config[key] = value;
    this.watchers.forEach((w) => w(key));
  }

  registerWatcher(watcher: (key: keyof Config) => void) {
    this.watchers.push(watcher);
  }
}
