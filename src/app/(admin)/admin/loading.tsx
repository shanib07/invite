export default function Loading() {
  return (
    <div className="animate-pulse space-y-5" aria-label="Loading">
      <div className="h-10 w-52 rounded bg-black/10" />
      <div className="h-44 rounded-2xl bg-black/5" />
    </div>
  );
}
