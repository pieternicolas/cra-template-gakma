/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { RouteProps, Route } from 'react-router-dom';

import useHistory from 'hooks/useHistory';

const PrivateRoute = (props: RouteProps) => {
  const { historyReplace } = useHistory();
  const isAuthenticated = useMemo(() => {
    // TO-CONFIG
    return false;
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      historyReplace('/', {});
    }
  }, [isAuthenticated]);

  return <Route {...props} />;
};

export default PrivateRoute;
