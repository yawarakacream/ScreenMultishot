import { CommunicatorParameter } from "@/communicator/communicator";
import { Config } from "@/config/config";

export interface MenuParameter extends CommunicatorParameter {
  getConfig: { req: keyof Config; res: any };
  setConfig: { req: { key: keyof Config; value: any }; res: void };
  openStorageDirectoryDialog: { req: undefined; res: string | null };
  isValidStorageDirectory: { req: string; res: boolean };
}
