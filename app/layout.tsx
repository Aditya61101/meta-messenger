import "../styles/globals.css";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html>
      <head />
      <body>
        {/* @ts-ignore */}
        <Header />
        {children}
      </body>
    </html>
  )
}
