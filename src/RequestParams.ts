import { IncomingMessage } from 'http';

export interface RequestParams {
  route: string | null;
  pathParam: string | null;
  query: string | null;
  src: IncomingMessage;
}
