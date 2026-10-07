function AuthLayout({ title, description, children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory px-6 py-12 text-ink">
      <section className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.04em] text-muted">
            Private worldbuilding workspace
          </p>

          <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">
            Story Vault
          </h1>

          <p className="mt-4 text-sm leading-6 text-muted">{description}</p>
        </div>

        <div className="rounded-md border border-stone bg-cream p-6">
          <h2 className="font-display text-3xl font-semibold">{title}</h2>

          <div className="mt-6">{children}</div>
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
