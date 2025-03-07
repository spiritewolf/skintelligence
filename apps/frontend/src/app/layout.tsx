import { ApolloWrapper } from './providers/ApolloProvider';
import MantineProvider from './providers/MantineProvider';
import './theme/style.css';
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
    <html lang="en">
      <head>
        <title>Skintelligence</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ApolloWrapper>
          <MantineProvider>{children}</MantineProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
