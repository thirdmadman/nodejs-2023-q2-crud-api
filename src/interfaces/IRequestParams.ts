import { IncomingMessage } from 'http';

export interface IRequestParams {
  route: string | null;
  pathParam: string | null;
  query: string | null;
  src: IncomingMessage;
}
