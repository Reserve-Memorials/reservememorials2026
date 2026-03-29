"use client";

import { useState } from "react";
import { ArrowRight, Heart, MapPin, Play, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function LicenseHero() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const scrollToForm = () => {
    document
      .getElementById("license-inquiry-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        {/* Background video -- falls back to gradient if file not found */}
        {!videoFailed && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            src="/license-hype.mp4"
            onError={() => setVideoFailed(true)}
          />
        )}

        {/* Fallback gradient when video is missing */}
        {videoFailed && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
        {/* Tone overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-sky-600/25 via-blue-700/15 to-indigo-800/20 dark:from-sky-500/20 dark:via-blue-600/15 dark:to-indigo-700/20 mix-blend-screen dark:mix-blend-soft-light" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-8 px-4 py-24 text-center sm:px-6 lg:px-10">
          <Badge
            variant="secondary"
            className="bg-white/15 text-white border-white/25 shadow-sm backdrop-blur-sm"
          >
            License Opportunity
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Own a Reserve Memorials License
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80">
            Join a growing memorial brand helping families honor loved ones
            across America. Low overhead, exclusive territories, comprehensive
            training, and a modern technology platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="shadow-lg"
              onClick={scrollToForm}
            >
              Request Information
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              onClick={() => setDialogOpen(true)}
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Our Story
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-white" />
              <span>Proven brand</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-white" />
              <span>Meaningful work</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-white" />
              <span>Exclusive territories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Our Story</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <video
                controls
                className="h-full w-full"
                src="/license-hype.mp4"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground pointer-events-none">
                Video coming soon
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
