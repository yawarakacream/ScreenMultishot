import { ipcRenderer } from "electron";
import { CommunicatorParameter, IpcParameter } from "./communicator";

export default class RendererCommunicator<T extends CommunicatorParameter> {
  readonly channel: string;

  constructor(channel: string) {
    this.channel = channel;
  }

  send<K extends keyof T>(key: K, value: T[K]["req"]): T[K]["res"] {
    const data: IpcParameter<T> = { key, value };
    return ipcRenderer.sendSync(this.channel, data).data;
  }
}
