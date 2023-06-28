/* eslint-disable class-methods-use-this */
import { ServerResponse } from 'http';
import { IRequestParams } from '../interfaces/IRequestParams';

export class Controller {
  handleRequest(req: IRequestParams, resp: ServerResponse) {
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

  onGet(req: IRequestParams, resp: ServerResponse) {}

  onPost(req: IRequestParams, resp: ServerResponse) {}

  onPut(req: IRequestParams, resp: ServerResponse) {}

  onDelete(req: IRequestParams, resp: ServerResponse) {}
}
