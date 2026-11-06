import React, { ComponentType, lazy, Suspense } from 'react';
import Loader from '../components/common/Loader';

/** Defers loading a route's module until navigation first renders that route. */
export function lazyScreen(load: () => Promise<{ default: ComponentType<any> }>): ComponentType<any> {
  const Screen = lazy(load);

  function LazyRoute(props: any) {
    return (
      <Suspense fallback={<Loader />}>
        <Screen {...props} />
      </Suspense>
    );
  }

  return LazyRoute;
}
