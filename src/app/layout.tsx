import type { Metadata, Viewport } from 'next';
import AppLayout from './AppLayout';
import SWRProvider from './SWRProvider';
import './global.css';
import manifest from './manifest';

export const metadata: Metadata = {
  title: manifest().name,
  description: manifest().description,
};

export const viewport: Viewport = { themeColor: manifest().theme_color };

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
      <link
        href="https://font.sec.miui.com/font/css?family=MiSans:400,500,700:Chinese_Simplify,Chinese_Traditional,Latin,Numeric&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      <SWRProvider>
        <AppLayout>{children}</AppLayout>
      </SWRProvider>
    </body>
  </html>
);

export default RootLayout;
