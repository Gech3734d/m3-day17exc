// In-memory data is intentionally small for the coursework demo.
// IDs are strings so they match the signed session's userId claim.
const users = [
  { id: "1", email: "alice@example.com", password: "password123", role: "customer" },
  { id: "2", email: "bob@example.com", password: "password123", role: "customer" },
  { id: "3", email: "staff@example.com", password: "password123", role: "staff" }
];

const orders = [
  { id: "A-100", userId: "1", item: "Doro Wat", status: "Preparing" },
  { id: "A-101", userId: "1", item: "Tibs", status: "Ready for pickup" },
  { id: "B-200", userId: "2", item: "Pizza", status: "Preparing" }
];

export function findUserByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === String(email).toLowerCase()) || null;
}

export function getOrdersForUser(sessionUserId) {
  // Security boundary: never accept userId from a URL or request body.
  return orders.filter((order) => order.userId === String(sessionUserId));
}

export function getAllOrdersForStaff() {
  return orders.map(({ id, userId, item, status }) => ({ id, userId, item, status }));
}
