type RouteHandler = (params: Record<string, string>) => Promise<void> | void;

interface Route {
  pattern: RegExp;
  handler: RouteHandler;
}

const routes: Route[] = [];

export function addRoute(pattern: string, handler: RouteHandler): void {
  const regexStr = pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)');
  routes.push({ pattern: new RegExp(`^${regexStr}$`), handler });
}

export function navigate(): void {
  const hash = window.location.hash.slice(1) || '/';
  for (const route of routes) {
    const match = hash.match(route.pattern);
    if (match) {
      route.handler(match.groups ?? {});
      return;
    }
  }
  window.location.hash = '#/';
}

export function startRouter(): void {
  window.addEventListener('hashchange', navigate);
  navigate();
}
