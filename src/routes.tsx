import { AuthGuard, LoadingScreen } from "components";
import { MainLayout } from "layouts";
import React, { Fragment, Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const routes = [
  {
    path: "/",
    layout: MainLayout,
    routes: [
      {
        exact: false,
        path: "/new-fund",
        component: lazy(() => import("pages/NewFundPage")),
      },
      {
        exact: true,
        path: "/funds",
        component: lazy(() => import("pages/FundPage")),
      },
      {
        exact: true,
        path: "/fund/:id",
        component: lazy(() => import("pages/FundDetailsPage")),
      },
      {
        exact: false,
        path: "/governance",
        component: lazy(() => import("pages/GovernancePage")),
      },
      {
        exact: false,
        path: "/mining",
        component: lazy(() => import("pages/MiningPage")),
      },
      {
        layout: AuthGuard,
        exact: false,
        path: "/profile",
        component: lazy(() => import("pages/ProfilePage")),
      },
      {
        path: "*",
        // eslint-disable-next-line
        component: () => <Redirect to="/funds" />,
      },
    ],
  },
];

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route: any, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            exact={route.exact}
            key={i}
            path={route.path}
            render={(props) => (
              <Layout>
                {route.routes ? (
                  renderRoutes(route.routes)
                ) : (
                  <Component {...props} />
                )}
              </Layout>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

export default routes;
