import { ServerResponse } from 'http';
import { RequestParams } from './RequestParams';

export interface RouteObject {
  route: string;
  callback: (req: RequestParams, resp: ServerResponse) => void;
}
