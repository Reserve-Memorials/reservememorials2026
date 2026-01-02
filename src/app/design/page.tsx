import DesignStartForm from "./DesignStartForm";

export default function DesignStartPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Start a design</h1>
        <p className="text-sm text-zinc-600">
          Enter your ZIP and contact info. We’ll route your request to the
          correct territory (or corporate unassigned).
        </p>
      </div>
      <div className="rounded-lg border border-black/10 p-5">
        <DesignStartForm />
      </div>
    </div>
  );
}


