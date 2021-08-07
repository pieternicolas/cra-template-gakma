/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

const useAfterMountEffect = (fn: () => any, deps: any[]) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      fn();
    } else {
      didMountRef.current = true;
    }
  }, deps);
};

export default useAfterMountEffect;
