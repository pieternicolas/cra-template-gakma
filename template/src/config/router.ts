/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ComponentType,
  LazyExoticComponent,
  lazy as lazyLoad,
  ReactNode,
} from 'react';

const Home = lazyLoad(() => import('pages/Home'));

const PATHS = ['/'] as const;

type ExtractRouteParams<T> = string extends T
  ? Record<string, string>
  : T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
  : T extends `${infer _Start}:${infer Param}`
  ? { [k in Param]: string }
  : {};

export type Path = typeof PATHS[number];

// Object which has matching parameter keys for a path.
export type PathParams<P extends Path> = ExtractRouteParams<P>;

export type RoutingProps = {
  path: Path;
  component: LazyExoticComponent<() => ReactNode> | ComponentType;
  routeType: 'publicOnly' | 'private';
};

const mainRoutingList: RoutingProps[] = [
  {
    path: '/',
    component: Home,
    routeType: 'private',
  },
];

export default mainRoutingList;
