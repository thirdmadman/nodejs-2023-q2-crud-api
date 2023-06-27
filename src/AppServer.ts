import { createServer, ServerResponse } from 'http';
import { UserController } from './UserController';
import { Router } from './Router';
import { RequestParams } from './RequestParams';

const host = 'localhost';
const port = 8000;
const API_PREFIX = '/api/';

export class AppServer {
  constructor() {
    const router = new Router();
    router.setPrefix(API_PREFIX);

    const userController = new UserController();

    router.addRoute('users', (req: RequestParams, res: ServerResponse) => userController.handleRequest(req, res));

    const server = createServer((req, resp) => router.handle(req, resp));
    server.listen(port, host, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on http://${host}:${port}`);
    });
  }
}
