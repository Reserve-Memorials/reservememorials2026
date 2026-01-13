import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Privacy Policy</CardTitle>
          <p className="text-sm text-muted-foreground">
            Placeholder policy page (safe step). Replace with your legal text.
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            We respect your privacy. This page will describe what information we collect, how we use it, and your choices.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

