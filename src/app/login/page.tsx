import Link from "next/link";
import LoginForm from "./LoginForm";
import { Suspense } from "react";
import MagicLinkForm from "./MagicLinkForm";
import { Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Secure portal sign-in
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in with a magic link (recommended) or password.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense fallback={<div className="h-10 w-full animate-pulse rounded-md bg-muted" />}>
            <Tabs defaultValue="magic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="magic">Magic link</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="magic" className="mt-4">
                <MagicLinkForm />
              </TabsContent>
              <TabsContent value="password" className="mt-4">
                <LoginForm />
                <div className="mt-3 text-sm text-muted-foreground">
                  Forgot password?{" "}
                  <Link className="underline" href="/reset-password">
                    Reset it
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}


