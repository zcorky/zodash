export interface Route {
  name: string;
  path: string;
  icon: string;
  children?: Route[];
}

export type NestRoutes = Route[];

export type FlatRoutes = Omit<Route, 'children'>[];

export type IndexRoutes = Record<string, Omit<Route, 'children'>>;

export type TreeNode = {
  name: string;
  path: string;
  icon: string;
  children?: TreeNodeChildren;
  [key: string]: any;
};

export type TreeNodeChildren = {
  [key: string]: TreeNode;
};

export type TreeRoute = TreeNode;