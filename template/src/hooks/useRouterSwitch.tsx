import { Route, Switch } from 'react-router-dom';
import { ComponentType, useMemo } from 'react';

import PublicOnlyRoute from 'containers/PublicOnlyRoute';
import PrivateRoute from 'containers/PrivateRoute';

import { RoutingProps } from 'config/router';

/**
 * A hook for defining route switch.
 * @param routes
 * @param fallbackComponent
 */
export const useTypedSwitch = (
  routes: ReadonlyArray<Omit<RoutingProps, 'routeType'>>,
  fallbackComponent?: ComponentType
): ComponentType => {
  const Fallback = fallbackComponent;

  return () => (
    <Switch>
      {routes.map(({ path, component: RouteComponent }) => (
        <Route exact strict sensitive path={path} key={`subroute-${path}`}>
          <RouteComponent />
        </Route>
      ))}
      {Fallback && <Fallback />}
    </Switch>
  );
};

/**
 * A hook for defining route switch.
 * @example
 * const TypedSwitch = useTypedSwitch([
 *   { path: '/', component: Home },
 *   { path: '/user/:id', component: User },
 * ]);
 * @param routes
 * @param fallbackComponent
 */
const useRouterSwitch = (
  routes: ReadonlyArray<RoutingProps>,
  fallbackComponent?: ComponentType
): ComponentType => {
  const Fallback = fallbackComponent;

  const { publicOnlyRoutingList, privateRoutingList } = useMemo(() => {
    return routes.reduce<{
      publicOnlyRoutingList: RoutingProps[];
      privateRoutingList: RoutingProps[];
    }>(
      (acc, route) => {
        if (route.routeType === 'private') {
          return {
            ...acc,
            privateRoutingList: [...acc.privateRoutingList, route],
          };
        } else {
          return {
            ...acc,
            publicOnlyRoutingList: [...acc.publicOnlyRoutingList, route],
          };
        }
      },
      {
        publicOnlyRoutingList: [],
        privateRoutingList: [],
      }
    );
  }, [routes]);

  return () => (
    <Switch>
      {publicOnlyRoutingList.map((route) => {
        return (
          <PublicOnlyRoute
            key={`public-route-${route.path}`}
            exact
            strict
            sensitive
            path={route.path}
            component={route.component}
          />
        );
      })}

      {privateRoutingList.map((route) => {
        return (
          <PrivateRoute
            key={`private-route-${route.path}`}
            exact
            strict
            sensitive
            path={route.path}
            component={route.component}
          />
        );
      })}

      {Fallback && <Fallback />}
    </Switch>
  );
};

export default useRouterSwitch;
