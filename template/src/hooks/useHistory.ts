import { useMemo } from 'react';
import { useHistory as useRouterHistory, useLocation } from 'react-router-dom';
import { History } from 'history';

import { Path } from 'config/router';

import { buildUrl, BuildUrlProps } from 'helpers/paths';

export type useHistoryReturn = {
  history: History;
  historyPush: (
    path: BuildUrlProps<Path>['path'],
    params: BuildUrlProps<Path>['params'],
    state?: Record<string, any>
  ) => void;
  historyReplace: (
    path: BuildUrlProps<Path>['path'],
    params: BuildUrlProps<Path>['params']
  ) => void;
  historyRefresh: () => void;
  historyBack: (amount: number) => void;
  historyState: any;
  cleanHistoryState: () => void;
};

const useHistory = (): useHistoryReturn => {
  const history = useRouterHistory();
  const location = useLocation<any>();

  return useMemo(
    () => ({
      // For convenience add push(), replace(), pathname at top level
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      history,
      historyBack: (amount: number = 0) => {
        if (amount > 0) throw new Error('Needs to be a negative number');

        history.go(amount);
      },
      historyRefresh: () => history.go(0),
      historyPush: <P extends Path>(
        path: BuildUrlProps<P>['path'],
        params: BuildUrlProps<P>['params'],
        state?: Record<string, any>
      ) => history.push(buildUrl(path, params), state),
      historyReplace: <P extends Path>(
        path: BuildUrlProps<P>['path'],
        params: BuildUrlProps<P>['params']
      ) => history.replace(buildUrl(path, params)),
      historyState: location.state,
      cleanHistoryState: () => {
        window.history.replaceState({}, document.title);
      },
    }),
    [history, location]
  );
};

export default useHistory;
