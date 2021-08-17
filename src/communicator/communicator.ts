export interface IpcParameter<T extends object> {
  key: keyof T;
  value: any;
}

export interface RendererToMainParameter {
  [k: string]: { req: any; res: any };
}

export interface MainToRendererParameter {
  [k: string]: { req: any };
}
