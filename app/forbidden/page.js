import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main>
      <section className="card">
        <h1>403 — Forbidden</h1>
        <p>Your account does not have permission to access this page.</p>
        <p>Use <code>staff@example.com</code> to test the staff-only kitchen page.</p>
        <Link href="/">Return home</Link>
      </section>
    </main>
  );
}
