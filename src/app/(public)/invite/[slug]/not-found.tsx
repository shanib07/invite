import { MailX } from "lucide-react";

export default function InvitationNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f4efe5] px-5 text-center text-[#29251e]">
      <div>
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-white shadow-sm">
          <MailX aria-hidden className="size-6" />
        </span>
        <p className="mt-7 text-[10px] font-bold tracking-[0.3em] text-[#9a7b47] uppercase">
          Invite
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold">
          Invitation not found
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#756b5d]">
          This link may be incomplete or no longer available. Please ask your
          host for the latest invitation.
        </p>
      </div>
    </main>
  );
}
