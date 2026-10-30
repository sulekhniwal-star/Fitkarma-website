import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" dir="ltr">
      <body className="min-h-screen bg-canvas text-fk-textPrimary antialiased selection:bg-brand-primary/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}

