import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Terms of Service</CardTitle>
          <p className="text-sm text-muted-foreground">
            Placeholder terms page (safe step). Replace with your legal text.
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            This page will outline service terms, disclaimers, and policies. We’ll replace this with your final text before launch.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

