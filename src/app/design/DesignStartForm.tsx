"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type CreateProspectResponse = {
  prospectId: string;
  designSessionId: string;
  assignedOrgId: string | null;
};

export default function DesignStartForm() {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zip, name, email, phone }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to start design");
      }
      const data = (await res.json()) as CreateProspectResponse;
      router.push(`/design/session/${data.designSessionId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start design");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">ZIP</label>
          <input
            className="w-full rounded-md border border-black/15 px-3 py-2"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            inputMode="numeric"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            className="w-full rounded-md border border-black/15 px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded-md border border-black/15 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input
            className="w-full rounded-md border border-black/15 px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}
      <button
        disabled={loading}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        type="submit"
      >
        {loading ? "Starting..." : "Start Design"}
      </button>
    </form>
  );
}


