import { IncomingMessage, ServerResponse } from 'http';
import { RouteObject } from './RouteObject';

export class Router {
  routes: Array<RouteObject> = [];

  addRoute(route: string, callback: (req: IncomingMessage, resp: ServerResponse) => void) {
    this.routes.push({ route, callback } as RouteObject);
  }

  removeRoute(route: string) {
    this.routes = this.routes.filter((r) => r.route !== route);
  }

  handle(req: IncomingMessage, res: ServerResponse) {
    try {
      if (req.url && this.routes && this.routes.length > 0) {
        const reqRouteString = req.url.split('?')[0];
        if (reqRouteString) {
          const currentRoute = this.routes.find((route) => reqRouteString.indexOf(route.route) === 0);
          if (currentRoute) {
            currentRoute.callback(req, res);
            return;
          }
        }
      }
    } catch (e) {
      console.error(e);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Resource not found' }));
  }
}
