import { Path, PathParams } from 'config/router';

/**
 * Build an url with a path and its parameters.
 * @example
 * buildUrl(
 *   '/a/:first/:last',
 *   { first: 'p', last: 'q' },
 * ) // returns '/a/p/q'
 * @param path target path.
 * @param params parameters.
 */
export type BuildUrlProps<P extends Path> = {
  path: P;
  params: PathParams<P>;
};

export const buildUrl = <P extends Path>(
  path: BuildUrlProps<P>['path'],
  params: BuildUrlProps<P>['params']
): string => {
  let url: string = path;

  // Upcast `params` to be used in string replacement.
  const paramObj: { [i: string]: string } = params;

  for (const key of Object.keys(paramObj)) {
    url = url.replace(`:${key}`, paramObj[key]);
  }

  return url;
};

/**
 * Type predicate for checking whether params match the path specs.
 * @example
 * isParams(
 *   '/something/:id',
 *   { id: 'abcd' },
 * ) // returns true.
 *
 * isParams(
 *   '/else/:one',
 *   { two: 'efg' },
 * ) // returns false.
 * @param path target path.
 * @param params params to be checked.
 */
export const isParams = <P extends Path>(
  path: P,
  params: unknown
): params is PathParams<P> => {
  if (!(params instanceof Object)) {
    return false;
  }

  const paramSet = new Set(Object.keys(params));
  // Validate params.
  const requiredParams = path
    .split('/')
    .filter((s) => s.startsWith(':'))
    .map((s) => s.substr(1));

  for (const x of requiredParams) {
    if (!paramSet.has(x)) {
      return false;
    }
  }

  return true;
};
