import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Session Security Demo",
  description: "Next.js authentication and authorization coursework"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <strong>Session Security Demo</strong>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/kitchen">Kitchen</Link>
            <Link href="/signin">Sign in</Link>
          </nav>
        </header>
        {children}
        <footer>Next.js session security coursework demo</footer>
      </body>
    </html>
  );
}
