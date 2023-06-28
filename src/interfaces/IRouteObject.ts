import { ServerResponse } from 'http';
import { IRequestParams } from './IRequestParams';

export interface IRouteObject {
  route: string;
  callback: (req: IRequestParams, resp: ServerResponse) => void;
}
