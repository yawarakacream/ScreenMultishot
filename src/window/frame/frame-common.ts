import { MainToRendererParameter, RendererToMainParameter } from "@/communicator/communicator";
import { Config } from "@/config/config";

export const FrameModes = ["movable", "freeze"] as const;

export type FrameMode = typeof FrameModes[number];

export interface R2MFrameParameter extends RendererToMainParameter {
  getConfig: { req: keyof Config; res: any };
  setConfig: { req: { key: keyof Config; value: any }; res: void };
}

export interface M2RFrameParameter extends MainToRendererParameter {
  setStyle: { req: { rgb: string; alpha: number; size: number } };
  setMode: { req: FrameMode };
}
