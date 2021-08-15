export interface IpcParameter<T extends CommunicatorParameter> {
  key: keyof T;
  value: any;
}

export interface CommunicatorParameter {
  [k: string]: { req: any; res: any };
}
