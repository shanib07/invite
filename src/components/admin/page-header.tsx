export function PageHeader({
  eyebrow = "Invitation studio",
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          {description}
        </p>
      </div>
      {action}
    </header>
  );
}
