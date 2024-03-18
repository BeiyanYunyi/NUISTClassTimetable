import AppLayout from '@/components/AppLayout';
import SWRProvider from '@/components/SWRProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import type { Metadata, Viewport } from 'next';
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
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
      />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <link
        href="https://font.sec.miui.com/font/css?family=MiSans:400,500,700:Chinese_Simplify,Chinese_Traditional,Latin,Numeric&display=swap"
        rel="stylesheet"
      />
    </head>
    <body className="font-sans">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SWRProvider>
          <AppLayout>{children}</AppLayout>
        </SWRProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
