import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { SkintelligenceProviders } from '../components/providers';
import '../styles/fonts.css';
import '../styles/globals.scss';
import '../styles/style.css';
export const metadata = {
  title: 'Skintelligence',
  description: 'Some catchy line here.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <title>Skintelligence</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SkintelligenceProviders>
          <Notifications />
          {children}
        </SkintelligenceProviders>
      </body>
    </html>
  );
}
