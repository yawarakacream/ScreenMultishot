import { CommunicatorParameter } from "@/communicator/communicator";

export interface FrameParameter extends CommunicatorParameter {
  onFrame: { req: boolean; res: void };
}
