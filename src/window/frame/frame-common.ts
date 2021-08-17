import { CommunicatorParameter } from "@/communicator/communicator";
import { Config } from "@/config/config";

export interface FrameParameter extends CommunicatorParameter {
  getConfig: { req: keyof Config; res: any };
  setConfig: { req: { key: keyof Config; value: any }; res: void };
  onFrame: { req: boolean; res: void };
}

export type FrameMode = "freeze" | "movable";
