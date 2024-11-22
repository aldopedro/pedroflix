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
    <link rel="preload" href="/fonts/myfont.eot" as="font" crossOrigin="anonymous" /><link rel="preload" href="/fonts/mywofffont.woff2" as="font" type="font/woff2" crossOrigin=""/>
      <body className={``}>
        {children}
      </body>
    </html>
    </>
  );
}
