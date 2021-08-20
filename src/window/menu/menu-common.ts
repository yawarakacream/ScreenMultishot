import { MainToRendererParameter, RendererToMainParameter } from "@/communicator/communicator";
import { Config } from "@/config/config";

export interface R2MMenuParameter extends RendererToMainParameter {
  getConfig: { req: keyof Config; res: any };
  setConfig: { req: { key: keyof Config; value: any }; res: void };
  openStorageDirectoryDialog: { req: undefined; res: void };
  onCameraButtonClicked: { req: undefined; res: void };
  onPdfButtonClicked: { req: { photos: string[] }; res: void };
  getStorageFiles: { req: undefined; res: string[] | null };
}

export interface M2RMenuParameter extends MainToRendererParameter {
  onStorageUpdate: { req: string | null; res: void };
  onStorageFileUpdate: { req: string[] | null; res: void };
  setPdfAvailableOnMain: { req: undefined; res: void };
}
