export interface Route {
  name?: string;
  path: string;
  icon?: string;
  children?: Route[];
}

export type TreeRoute = {
  name?: string;
  path: string;
  icon?: string;
  children?: TreeRouteChildren;
  [key: string]: any;
};

export type TreeRouteChildren = {
  [key: string]: TreeRoute;
};

export type NestRoutes = Route[];

export type FlatRoutes = Omit<Route, 'children'>[];

export type IndexRoutes = Record<string, Omit<Route, 'children'>>;
