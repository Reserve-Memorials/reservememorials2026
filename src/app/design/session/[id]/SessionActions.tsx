"use client";

import { useState } from "react";

export default function SessionActions({ designSessionId }: { designSessionId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [exporting, setExporting] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadExport() {
    if (!file) return;
    setError(null);
    setExporting(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`/api/design-sessions/${designSessionId}/export`, {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error(await res.text());
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setExporting(false);
    }
  }

  async function checkoutDeposit() {
    setError(null);
    setCheckingOut(true);
    try {
      const res = await fetch("/api/stripe/checkout/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designSessionId }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { url } = (await res.json()) as { url: string };
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setCheckingOut(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-black/10 p-4">
        <div className="mb-2 text-sm font-medium">Upload design export (MVP)</div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <button
            type="button"
            onClick={uploadExport}
            disabled={!file || exporting}
            className="rounded-md border border-black/15 px-3 py-2 text-sm font-medium disabled:opacity-60"
          >
            {exporting ? "Uploading..." : "Save / Export"}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={checkoutDeposit}
        disabled={checkingOut}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {checkingOut ? "Redirecting..." : "Continue to Deposit"}
      </button>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}
    </div>
  );
}


