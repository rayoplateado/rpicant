/* v8 ignore start */
import { QueryClient, QueryClientProvider } from "react-query";
import { Logo } from "./modules/shared/ui/logo";
import { Navbar } from "./modules/shared/ui/navbar";
import { DashboardPage } from "./pages/dashboard-page";

import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import { ReactNode } from "react";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AddMeasurementPage } from "./pages/add-measurement-page";
import { env } from "./modules/shared/env/env";

const router = routerFactory();

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function routerFactory() {
  const root = createRootRoute({
    component: () => (
      <>
        <Navbar>
          <Logo />
        </Navbar>
        <Outlet />
        {!env.isProd() && <TanStackRouterDevtools />}
      </>
    ),
  });

  const index = createRoute({
    getParentRoute: () => root,
    path: "/",
    component: DashboardPage,
  });

  const create = createRoute({
    getParentRoute: () => root,
    path: "/create",
    component: AddMeasurementPage,
  });

  return createRouter({
    routeTree: root.addChildren([index, create]),
  });
}

function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
/* v8 ignore end */
