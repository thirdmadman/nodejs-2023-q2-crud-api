import { IncomingMessage, ServerResponse } from 'http';

export interface RouteObject {
  route: string;
  callback: (req: IncomingMessage, resp: ServerResponse) => void;
}
