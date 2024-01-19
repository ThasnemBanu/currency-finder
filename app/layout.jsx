import "./globals.css";

export const metadata = {
  title: "Currency Finder",
  description: "App to find currency of the selected country",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
