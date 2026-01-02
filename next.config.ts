import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Cursor is detecting a pnpm lockfile outside this repo and Turbopack can pick the wrong root.
    // Pin the root so module/CSS resolution stays within this project.
    root: __dirname,
  },
};

export default nextConfig;
