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
  frameColor: {
    rgb: string;
    alpha: number;
  };
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
  !!object.frameColor &&
  typeof object.frameColor === "object" &&
  typeof object.frameColor.rgb === "string" &&
  typeof object.frameColor.alpha === "number" &&
  typeof object.storageDirectory === "string" &&
  typeof object.photoName === "string" &&
  typeof object.pdfName === "string";
