import { useRouteMatch } from 'react-router';

import { Path, PathParams } from 'config/router';
import { isParams } from 'helpers/paths';

/**
 * Type-safe version of `react-router-dom/useParams`.
 * @param path Path to match route.
 * @returns parameter object if route matches. `null` otherwise.
 */
const useParams = <P extends Path>(path: P): PathParams<P> | null => {
  // `exact`, `sensitive` and `strict` options are set to true
  // to ensure type safety.
  const match = useRouteMatch({
    path,
    exact: true,
    sensitive: true,
    strict: true,
  });

  if (!match || !isParams(path, match.params)) {
    return null;
  }
  return match.params;
};

export default useParams;
