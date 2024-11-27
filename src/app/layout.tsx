import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Pedroflix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html lang="en">
    <link rel="preload" href="uhttps://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff2" as="font" crossOrigin="anonymous" /><link rel="preload" href="https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff2" as="font" type="font/woff2" crossOrigin=""/>
      <body className={``}>
        {children}
      </body>
    </html>
    </>
  );
}
