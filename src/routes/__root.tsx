// src/routes/__root.tsx
/// <reference types="vite/client" />;
import NetworkErrorFallback from "@/components/core/NetworkErrorFallback";
import NetworkStatusIndicator from "@/components/core/NetworkErrorIndicator";
import NotFoundComponent from "@/components/core/NotFoundComponent";
import { Toaster } from "@/components/ui/sonner";
import { authMiddleware } from "@/utils/helpers/middleware";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import appCss from "../styles/app.css?url";
import favIconUrl from "../assets/fav-icon.svg?url";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Nyaya Tech",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/svg+xml", href: favIconUrl },
    ],
  }),
  notFoundComponent: () => {
    return <NotFoundComponent />;
  },
  component: RootComponent,
  beforeLoad: authMiddleware,
});

function RootComponent() {
  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ error, resetErrorBoundary }) => (
                <NetworkErrorFallback
                  error={error}
                  onRetry={resetErrorBoundary}
                />
              )}
            >
              <NetworkStatusIndicator />
              <Outlet />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <Toaster position="top-center" />
      </QueryClientProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
