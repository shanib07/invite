export default function InvitationLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#e9eee7] px-4">
      <div className="w-full max-w-xl animate-pulse rounded-[2rem] bg-white/70 p-8">
        <div className="mx-auto h-3 w-32 rounded bg-black/10" />
        <div className="mx-auto mt-10 h-16 w-4/5 rounded bg-black/10" />
        <div className="mx-auto mt-6 h-10 w-1/2 rounded bg-black/10" />
        <div className="mt-12 h-28 rounded-2xl bg-black/5" />
      </div>
    </main>
  );
}
