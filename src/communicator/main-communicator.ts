import { ipcMain } from "electron";
import { CommunicatorParameter, IpcParameter } from "./communicator";

type Listeners<T extends CommunicatorParameter> = {
  [k in keyof T]: (value: T[k]["req"]) => T[k]["res"];
};

export default class MainCommunicator<T extends CommunicatorParameter> {
  readonly channel: string;

  constructor(channel: string, listeners: Listeners<T>) {
    this.channel = channel;

    ipcMain.on(this.channel, (event: Electron.IpcMainEvent, param: IpcParameter<T>) => {
      event.returnValue = { data: listeners[param.key](param.value) };
    });
  }
}
