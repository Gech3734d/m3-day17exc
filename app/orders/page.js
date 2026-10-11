import { requireSession } from "@/lib/auth";
import { getOrdersForUser } from "@/lib/data";

export default async function OrdersPage() {
  const session = await requireSession("/orders");
  const orders = getOrdersForUser(session.id);

  return (
    <main>
      <h1>Your orders</h1>
      <p>Signed in as <strong>{session.email}</strong>. Only orders belonging to this account are shown.</p>
      {orders.length ? orders.map((order) => (
        <section className="card" key={order.id}>
          <h2>Order #{order.id}</h2>
          <p>Item: {order.item}</p>
          <p>Status: {order.status}</p>
        </section>
      )) : <section className="card"><p>No orders found for your account.</p></section>}
      <section className="card">
        <h2>API isolation test</h2>
        <p><code>GET /api/orders?userId=2</code> still returns only the current user's orders because the API ignores the supplied user ID.</p>
      </section>
    </main>
  );
}
