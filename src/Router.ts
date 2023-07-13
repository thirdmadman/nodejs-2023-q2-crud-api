/* eslint-disable class-methods-use-this */
import { IncomingMessage, ServerResponse } from 'http';
import { IRequestParams } from './interfaces/IRequestParams';
import { IRouteObject } from './interfaces/IRouteObject';

export class Router {
  routes: Array<IRouteObject> = [];

  prefix = '';

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  addRoute(route: string, callback: (req: IRequestParams, resp: ServerResponse) => void) {
    this.routes.push({ route, callback } as IRouteObject);
  }

  removeRoute(route: string) {
    this.routes = this.routes.filter((r) => r.route !== route);
  }

  parseRequestParams(srsReq: IncomingMessage, currentRoute: string) {
    if (!srsReq || !srsReq?.url) return null;

    const params: IRequestParams = {
      route: currentRoute,
      pathParam: null,
      query: null,
      src: srsReq,
    };

    const srcString = srsReq.url?.replace(currentRoute, '');
    if (srcString.length > 0) {
      const pathParam = srcString.split('?')[0];

      params.pathParam = pathParam.slice(1);

      if (srcString.indexOf('?') > -1) {
        const queryString = srcString.split('?')[1];
        params.query = queryString;
      }
    }

    return params;
  }

  handle(req: IncomingMessage, res: ServerResponse) {
    if (req.url) {
      try {
        if (req.url && this.routes && this.routes.length > 0) {
          if (req.url) {
            const currentRoute = this.routes.find((route) => req.url?.indexOf(`${this.prefix}${route.route}`) === 0);
            if (currentRoute) {
              const reqParams = this.parseRequestParams(req, `${this.prefix}${currentRoute.route}`);

              if (!reqParams) return;

              currentRoute.callback(reqParams, res);
              return;
            }
          }
        }
      } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end(JSON.stringify({ errors: [{ title: 'Error while handling request' }] }));
        return;
      }
    }

    res.writeHead(404);
    res.end(JSON.stringify({ errors: [{ title: 'Resource not found' }] }));
  }
}
