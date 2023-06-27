/* eslint-disable class-methods-use-this */
import { IncomingMessage, ServerResponse } from 'http';

export class Controller {
  handleRequest(req: IncomingMessage, resp: ServerResponse) {
    switch (req.method) {
      case 'GET':
        this.onGet(req, resp);
        break;
      case 'POST':
        this.onPost(req, resp);
        break;
      case 'PUT':
        this.onPut(req, resp);
        break;
      case 'DELETE':
        this.onDelete(req, resp);
        break;
      default:
        resp.writeHead(405);
        resp.end();
    }
  }

  onGet(req: IncomingMessage, resp: ServerResponse) {}

  onPost(req: IncomingMessage, resp: ServerResponse) {}

  onPut(req: IncomingMessage, resp: ServerResponse) {}

  onDelete(req: IncomingMessage, resp: ServerResponse) {}
}
