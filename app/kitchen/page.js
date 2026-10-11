import { requireRole } from "@/lib/auth";
import { getAllOrdersForStaff } from "@/lib/data";

export default async function KitchenPage() {
  // Authorization happens on the server before the protected data is loaded/rendered.
  await requireRole("staff", "/kitchen");
  const orders = getAllOrdersForStaff();

  return (
    <main>
      <h1>Kitchen dashboard</h1>
      <p className="success">Staff authorization passed on the server.</p>
      {orders.map((order) => (
        <section className="card" key={order.id}>
          <h2>Order #{order.id}</h2>
          <p>Item: {order.item}</p>
          <p>Status: {order.status}</p>
        </section>
      ))}
    </main>
  );
}
