import { createServer, ServerResponse } from 'http';
import { UserController } from './UserController';
import { Router } from './Router';
import { RequestParams } from './RequestParams';

import { PORT, HOST, API_PREFIX } from './common/config';

export class AppServer {
  constructor() {
    const router = new Router();
    router.setPrefix(API_PREFIX);

    const userController = new UserController();

    router.addRoute('users', (req: RequestParams, res: ServerResponse) => userController.handleRequest(req, res));

    const server = createServer((req, resp) => router.handle(req, resp));
    server.listen(PORT, Number(HOST), () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on http://${HOST}:${PORT}${API_PREFIX}`);
    });
  }
}
