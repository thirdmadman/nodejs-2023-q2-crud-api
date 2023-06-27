/* eslint-disable class-methods-use-this */
import { ServerResponse } from 'http';
import { RequestParams } from './RequestParams';

export class Controller {
  handleRequest(req: RequestParams, resp: ServerResponse) {
    switch (req.src.method) {
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

  onGet(req: RequestParams, resp: ServerResponse) {}

  onPost(req: RequestParams, resp: ServerResponse) {}

  onPut(req: RequestParams, resp: ServerResponse) {}

  onDelete(req: RequestParams, resp: ServerResponse) {}
}
