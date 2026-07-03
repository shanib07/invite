"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      aria-label="Copy invitation link"
      className="inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-xs font-semibold hover:bg-black/5"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }}
      type="button"
    >
      {copied ? (
        <Check aria-hidden className="size-3.5" />
      ) : (
        <Copy aria-hidden className="size-3.5" />
      )}
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
