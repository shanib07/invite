"use client";

export default function InvitationError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f4efe5] px-5 text-center">
      <div>
        <h1 className="font-display text-4xl font-semibold">
          We couldn’t open this invitation
        </h1>
        <p className="mt-3 text-sm text-[#756b5d]">
          Please check your connection and try once more.
        </p>
        <button
          className="mt-6 rounded-xl bg-[#59745d] px-5 py-3 text-sm font-bold text-white"
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
