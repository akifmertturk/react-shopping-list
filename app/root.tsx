import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import { ProductsProvider } from "./context/ProductsContext";
import Navbar from "./components/Navbar";
import "./tailwind.css";
import { BreadcrumbItem, Breadcrumbs, NextUIProvider } from "@nextui-org/react";
import { withEmotionCache } from "@emotion/react";
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material';
import ClientStyleContext from './src/ClientStyleContext';
import { useContext } from "react";
import { StyleSheet } from "@emotion/sheet";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
  },
];

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const clientStyleData = useContext(ClientStyleContext);

  // Only executed on client
  useEnhancedEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      // @ts-expect-error internal API
      (emotionCache.sheet as StyleSheet)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <meta name="emotion-insertion-point" content="emotion-insertion-point" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Document title="Akakçe">
      <NextUIProvider>
        <Navbar />
        <Breadcrumbs className="flex items-center my-2 px-32">
          <BreadcrumbItem href="/">Anasayfa</BreadcrumbItem>
          <BreadcrumbItem href="/">Telefon</BreadcrumbItem>
        </Breadcrumbs>
        {children}
        <ScrollRestoration />
        <Scripts />
      </NextUIProvider>
    </Document>
  );
}

export default function App() {
  return (
    <ProductsProvider>
      <Outlet />
    </ProductsProvider>
  );
}
