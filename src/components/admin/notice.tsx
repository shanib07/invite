export function Notice({
  success,
  error,
}: {
  success?: string;
  error?: string;
}) {
  const message = error ?? success;
  if (!message) return null;
  return (
    <p
      className={`mb-5 rounded-xl border px-4 py-3 text-sm ${error ? "border-red-200 bg-red-50 text-red-800" : "border-green-200 bg-green-50 text-green-800"}`}
      role="status"
    >
      {message}
    </p>
  );
}
