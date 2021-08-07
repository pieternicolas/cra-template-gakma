/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';

const isPrimitive = (val: any) => val !== Object(val);

const useDeepCompareEffect = (fn: () => any, deps: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    if (deps.every(isPrimitive)) {
      // eslint-disable-next-line no-console
      console.warn('No non primitive values found, use React.useEffect');
    }

    if (!(deps instanceof Array) || !deps?.length) {
      // eslint-disable-next-line no-console
      console.warn('No deps found, use React.useEffect');
    }
  }

  const ref = useRef<any>(undefined);

  if (!ref.current || !isEqual(deps, ref.current)) {
    ref.current = deps;
  }

  useEffect(fn, ref.current);
};

export default useDeepCompareEffect;
