import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getOrdersForUser } from "@/lib/data";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Do not accept a userId query parameter. Identity comes from verified session.
  return NextResponse.json({ orders: getOrdersForUser(session.id) });
}
