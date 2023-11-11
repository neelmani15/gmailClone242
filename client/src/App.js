import React from 'react';
import { Suspense,lazy } from 'react';
import Main from './pages/Main';
import {  Navigate, Route,RouterProvider,createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { routes } from './routes/routes';
import SuspenseLoading from './Error/SuspenseLoading';
const ErrorComponent =lazy(()=>import('./Error/ErrorComponent'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={routes.main.path} element={<Navigate to={`${routes.email.path}/inbox`} />} />
      <Route path={routes.main.path} element={<routes.main.element />}>
        <Route path={`${routes.email.path}/:type`} element={<routes.email.element />} errorElement={<ErrorComponent />} />
        <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponent />} />
      </Route>
      <Route path={routes.invalid.path} element={<Navigate to={`${routes.email.path}/inbox`} />} />
    </Route>
  )
)

function App() {
  return (
    <Suspense fallback={<SuspenseLoading />}> 
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
