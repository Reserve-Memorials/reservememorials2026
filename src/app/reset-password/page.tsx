import Link from "next/link";
import ResetPasswordForm from "./ResetPasswordForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <p className="text-sm text-muted-foreground">
            We’ll email you a link to reset your password.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResetPasswordForm />
          <div className="text-sm text-muted-foreground">
            Back to{" "}
            <Link className="underline" href="/login">
              login
            </Link>
            .
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
