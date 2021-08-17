import { ipcRenderer } from "electron";
import { IpcRendererEvent } from "electron/main";
import { RendererToMainParameter, MainToRendererParameter, IpcParameter } from "./communicator";

type Listeners<T extends MainToRendererParameter> = {
  [k in keyof T]: (value: T[k]["req"]) => void;
};

export default class RendererCommunicator<R2M extends RendererToMainParameter, M2R extends MainToRendererParameter> {
  readonly channel: string;

  constructor(channel: string, listeners: Listeners<M2R>) {
    this.channel = channel;

    ipcRenderer.on(this.channel, (_event: IpcRendererEvent, param: IpcParameter<M2R>) => {
      listeners[param.key](param.value);
    });
  }

  send<K extends keyof R2M>(key: K, value: R2M[K]["req"]): R2M[K]["res"] {
    const data: IpcParameter<R2M> = { key, value };
    return ipcRenderer.sendSync(this.channel, data).data;
  }
}
