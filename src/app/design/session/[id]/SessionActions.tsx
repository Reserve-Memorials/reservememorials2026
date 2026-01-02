"use client";

import { useState } from "react";
import { DownloadCloud, Loader2, Lock, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SessionActions({
  designSessionId,
}: {
  designSessionId: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [exporting, setExporting] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  async function uploadExport() {
    if (!file) return;
    setExporting(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(
        `/api/design-sessions/${designSessionId}/export`,
        {
          method: "POST",
          body: form,
        }
      );
      if (!res.ok) throw new Error(await res.text());
      toast.success("Export saved", {
        description: "Your file is now secured in storage.",
      });
      window.location.reload();
    } catch (err) {
      toast.error("Export failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setExporting(false);
    }
  }

  async function checkoutDeposit() {
    setCheckingOut(true);
    try {
      const res = await fetch("/api/stripe/checkout/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designSessionId }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { url } = (await res.json()) as { url: string };
      toast.message("Redirecting to checkout…", {
        description: "Stripe Checkout will open in a moment.",
      });
      window.location.href = url;
    } catch (err) {
      toast.error("Checkout failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setCheckingOut(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-base">Export your design</CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload an image or PDF. Assets are stored privately and scoped by
            org.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <Button
            type="button"
            onClick={uploadExport}
            disabled={!file || exporting}
            variant="secondary"
            className="w-full"
          >
            {exporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <UploadCloud className="mr-2 h-4 w-4" />
                Save export
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Button
        type="button"
        onClick={checkoutDeposit}
        disabled={checkingOut}
        className="w-full group"
        size="lg"
      >
        {checkingOut ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Redirecting…
          </>
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4" />
            Continue to deposit
            <DownloadCloud className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-[-1px]" />
          </>
        )}
      </Button>
    </div>
  );
}
