import { BrowserWindow, ipcMain } from "electron";
import { RendererToMainParameter, MainToRendererParameter, IpcParameter } from "./communicator";

type Listeners<T extends RendererToMainParameter> = {
  [k in keyof T]: (value: T[k]["req"]) => T[k]["res"];
};

export default class MainCommunicator<R2M extends RendererToMainParameter, M2R extends MainToRendererParameter> {
  readonly channel: string;

  constructor(channel: string, listeners: Listeners<R2M>) {
    this.channel = channel;

    ipcMain.on(this.channel, (event: Electron.IpcMainEvent, param: IpcParameter<R2M>) => {
      event.returnValue = { data: listeners[param.key](param.value) };
    });
  }

  send<K extends keyof M2R>(key: K, value: M2R[K]["req"]) {
    const data: IpcParameter<M2R> = { key, value };
    BrowserWindow.getAllWindows()
      .map((w) => w.webContents)
      .forEach((w) => w.send(this.channel, data));
  }
}
