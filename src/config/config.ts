import { FrameMode, FrameModes } from "@/window/frame/frame-common";

export interface Config {
  version: number;
  menuBounds: {
    width: number;
    height: number;
  };
  frameBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  frameStyle: {
    rgb: string;
    alpha: number;
    size: number;
  };
  frameMode: FrameMode;
  storageDirectory: string | null;
  photoName: string | null;
  pdfName: string | null;
}

export const isConfig = (object: any): object is Config =>
  object &&
  object.version === 1 &&
  !!object.menuBounds &&
  typeof object.menuBounds === "object" &&
  typeof object.menuBounds.width === "number" &&
  typeof object.menuBounds.height === "number" &&
  !!object.frameBounds &&
  typeof object.frameBounds === "object" &&
  typeof object.frameBounds.x === "number" &&
  typeof object.frameBounds.y === "number" &&
  typeof object.frameBounds.width === "number" &&
  typeof object.frameBounds.height === "number" &&
  !!object.frameStyle &&
  typeof object.frameStyle === "object" &&
  typeof object.frameStyle.rgb === "string" &&
  typeof object.frameStyle.alpha === "number" &&
  typeof object.frameStyle.size === "number" &&
  FrameModes.includes(object.frameMode) &&
  typeof object.storageDirectory === "string" &&
  typeof object.photoName === "string" &&
  typeof object.pdfName === "string";
