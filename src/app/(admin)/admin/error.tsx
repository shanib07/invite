"use client";

import { AlertTriangle } from "lucide-react";

export default function AdminError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <AlertTriangle aria-hidden className="mx-auto size-8 text-danger" />
        <h1 className="mt-4 font-display text-3xl font-semibold">
          We couldn’t load the dashboard
        </h1>
        <p className="mt-2 text-sm text-muted">
          Please check the connection and try again.
        </p>
        <button
          className="mt-5 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white"
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
