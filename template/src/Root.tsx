import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import useRouterSwitch from 'hooks/useRouterSwitch';

import mainRoutingList from 'config/router';

const Root = () => {
  const Switch = useRouterSwitch(mainRoutingList);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Switch />
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default Root;
