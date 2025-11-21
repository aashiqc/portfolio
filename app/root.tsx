import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import PageLoader from "./components/PageLoader";
import NavigationLoader from "./components/NavigationLoader";

export const links: Route.LinksFunction = () => [];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://ashiq.dev" />

        <Meta />
        <Links />
      </head>
      <body>
        <PageLoader />
        <NavigationLoader />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main
      className="pt-16 p-4 container mx-auto min-h-screen"
      style={{ backgroundColor: "var(--color-primary-bg)" }}
    >
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: "var(--color-heading)" }}
      >
        {message}
      </h1>
      <p
        className="text-lg mb-4"
        style={{ color: "var(--color-primary-text-80)" }}
      >
        {details}
      </p>
      {stack && (
        <pre
          className="w-full p-4 overflow-x-auto rounded-lg"
          style={{
            backgroundColor: "var(--color-primary-text-05)",
            color: "var(--color-primary-text)",
          }}
        >
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
