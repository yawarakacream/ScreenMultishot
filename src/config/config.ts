export interface Config {
  version: number;
  menuBounds: {
    width: number;
    height: number;
  };
  windowBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  storageDirectory: string | null;
  photoName: string | null;
  pdfName: string | null;
}

export const isConfig = (object: any): object is Config =>
  object &&
  object.version === 1 &&
  typeof object.menuBounds === "object" &&
  typeof object.menuBounds.width === "number" &&
  typeof object.menuBounds.height === "number" &&
  typeof object.storageDirectory === "string" &&
  typeof object.photoName === "string" &&
  typeof object.pdfName === "string";
