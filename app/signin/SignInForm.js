"use client";

import { useState } from "react";

export default function SignInForm({ nextPath }) {
  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, next: nextPath })
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Sign in failed.");
        return;
      }
      // API returns only a server-validated local destination.
      window.location.assign(result.redirectTo);
    } catch {
      setError("Unable to sign in. Check that the development server is running.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" autoComplete="username" required
        value={email} onChange={(event) => setEmail(event.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" autoComplete="current-password" required
        value={password} onChange={(event) => setPassword(event.target.value)} />
      <button type="submit" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      {error ? <p className="error" role="alert">{error}</p> : null}
    </form>
  );
}
