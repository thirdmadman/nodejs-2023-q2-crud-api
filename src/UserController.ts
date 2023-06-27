import { IncomingMessage, ServerResponse } from 'http';
import { RequestParams } from './RequestParams';
import { Controller } from './Controller';

export class UserController extends Controller {
  // eslint-disable-next-line class-methods-use-this
  onGet(req: RequestParams, resp: ServerResponse<IncomingMessage>) {
    if (req.pathParam) {
      resp.writeHead(200, { 'Content-Type': 'application/json' });
      resp.end('{"data": []}');
      return;
    }

    resp.writeHead(200, { 'Content-Type': 'application/json' });
    resp.end('{"data": [{}, {}]}');
  }
}
