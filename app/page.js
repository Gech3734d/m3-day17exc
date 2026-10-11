import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function HomePage() {
  const session = await getSession();
  return (
    <main>
      <h1>Secure Session Demo</h1>
      <p>This project demonstrates cookie-based sessions and server-side authorization.</p>
      <section className="card">
        {session ? (
          <>
            <p className="success">Signed in as <strong>{session.email}</strong> ({session.role}).</p>
            <p><Link href="/api/signout">Sign out</Link></p>
          </>
        ) : (
          <p>You are not signed in. <Link href="/signin">Sign in with a demo account</Link>.</p>
        )}
      </section>
      <section className="card">
        <h2>Try the protected routes</h2>
        <ul>
          <li><Link href="/checkout">Checkout</Link> — requires a session.</li>
          <li><Link href="/orders">Orders</Link> — shows only the signed-in account's orders.</li>
          <li><Link href="/kitchen">Kitchen</Link> — requires the staff role.</li>
        </ul>
      </section>
      <section className="card">
        <h2>Demo accounts</h2>
        <p>Customer: <code>alice@example.com</code> / <code>password123</code></p>
        <p>Customer: <code>bob@example.com</code> / <code>password123</code></p>
        <p>Staff: <code>staff@example.com</code> / <code>password123</code></p>
      </section>
    </main>
  );
}
