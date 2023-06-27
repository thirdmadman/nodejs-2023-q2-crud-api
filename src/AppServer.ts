import { IncomingMessage, createServer, ServerResponse } from 'http';
import { Router } from './Router';

const host = 'localhost';
const port = 8000;

export class AppServer {
  constructor() {
    const router = new Router();

    router.addRoute('/books', (req: IncomingMessage, res: ServerResponse) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.writeHead(200);
      res.end('books');
    });

    router.addRoute('/authors', (req: IncomingMessage, res: ServerResponse) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.writeHead(200);
      res.end('authors');
    });

    const server = createServer((req, resp) => router.handle(req, resp));
    server.listen(port, host, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on http://${host}:${port}`);
    });
  }
}
