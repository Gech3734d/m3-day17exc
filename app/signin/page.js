import SignInForm from "./SignInForm";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = typeof params?.next === "string" ? params.next : "/";
  return (
    <main>
      <h1>Sign in</h1>
      <p>Use one of the demo accounts listed on the home page.</p>
      <section className="card">
        <SignInForm nextPath={next} />
      </section>
    </main>
  );
}
