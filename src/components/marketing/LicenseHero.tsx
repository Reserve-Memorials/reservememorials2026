"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Heart, MapPin, Play, Shield } from "lucide-react";
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
        {/* Background image (always rendered as base) */}
        <Image
          src="/license/license-hero.jpg"
          alt="Memorial garden landscape"
          fill
          className="object-cover"
          priority
        />

        {/* Optional background video on top — hides itself if it fails to load */}
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

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/65 dark:bg-black/75" />
        {/* Bottom-weighted gradient to deepen contrast under the copy */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.55)_60%,rgba(0,0,0,0.7))]" />
        {/* Subtle tone overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-sky-600/15 via-blue-700/10 to-indigo-800/15 mix-blend-soft-light" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-4 py-24 text-center sm:px-6 lg:px-10 [&_*]:[text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
          <p className="mx-auto max-w-3xl text-xl font-medium leading-snug text-white sm:text-2xl lg:text-3xl">
            130,000+ deaths annually in Ohio. Less than 100 monument companies.
            Hmmm?
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Become a Reserve Memorials License Owner
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/95">
            A meaningful business opportunity in a timeless industry.
          </p>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90">
            Start a compassionate, community-based memorial business with
            Reserve Memorials.
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
