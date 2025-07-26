import type { Metadata } from "next";
import "./globals.css";
import { LoadingProvider } from "../components/ContextLoading";

export const metadata: Metadata = {
  title: "Pedroflix",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
      <link rel="preload" href="uhttps://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff2" as="font" crossOrigin="anonymous" />
      <link rel="preload" href="https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff2" as="font" type="font/woff2" crossOrigin=""/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
      </head>
      <body>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}