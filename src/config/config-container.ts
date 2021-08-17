import fs from "fs";
import path from "path";
import { Config, isConfig } from "./config";

const isDevelopment = process.env.NODE_ENV !== "production";

const configFilePath = path.resolve(isDevelopment ? "./storage_for_dev" : process.cwd(), "config.json");
const encoding = "utf8";

export class ConfigContainer {
  private config: Config;

  constructor() {
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
      frameColor: {
        rgb: "#000000",
        alpha: 50,
      },
      storageDirectory: path.resolve(isDevelopment ? "./storage_for_dev" : process.cwd(), "./storage"),
      photoName: "aaa",
      pdfName: "bbb",
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
  }
}
