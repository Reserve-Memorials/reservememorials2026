import DesignStartForm from "@/app/design/DesignStartForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortalDesignStartPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Start a design</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter ZIP and contact info. We’ll route to the correct territory (or corporate unassigned).
          </p>
        </CardHeader>
        <CardContent>
          <DesignStartForm />
        </CardContent>
      </Card>
    </div>
  );
}

