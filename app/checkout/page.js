import { requireSession } from "@/lib/auth";

export default async function CheckoutPage() {
  const session = await requireSession("/checkout");
  return (
    <main>
      <h1>Checkout</h1>
      <section className="card">
        <p>Protected route: only authenticated users can view this page.</p>
        <p>Signed in as <strong>{session.email}</strong>.</p>
        <p>This demo checkout does not process payments.</p>
      </section>
    </main>
  );
}
