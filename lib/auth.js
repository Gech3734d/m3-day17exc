import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export async function requireSession(returnTo = "/") {
  const session = await getSession();
  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(returnTo)}`);
  }
  return session;
}

export async function requireRole(role, returnTo = "/") {
  const session = await requireSession(returnTo);
  if (session.role !== role) {
    redirect("/forbidden");
  }
  return session;
}
