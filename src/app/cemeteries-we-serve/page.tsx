import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, ExternalLink, X } from "lucide-react";
import { getCemeteries } from "@/lib/cemeteries";

export const metadata: Metadata = {
  title: "Cemeteries We Serve | Reserve Memorials",
  description:
    "Search cemeteries we serve in Ohio. Filter by county or state and find cemetery addresses quickly.",
  alternates: { canonical: "/cemeteries-we-serve" },
};

type SearchParams = {
  q?: string;
  state?: string;
  county?: string;
  page?: string;
};

function normalizeQueryValue(v: string | undefined) {
  const s = (v ?? "").trim();
  return s.length ? s : "";
}

function toInt(v: string | undefined, fallback: number) {
  const n = Number.parseInt(v ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function buildMapsUrl({
  name,
  address1,
  city,
  state,
  zip,
}: {
  name: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
}) {
  const q = [name, address1, city, state, zip].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

function buildQueryString(params: Record<string, string | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v && v.trim().length) sp.set(k, v);
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export default async function CemeteriesWeServePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = normalizeQueryValue(sp.q);
  const state = normalizeQueryValue(sp.state).toUpperCase();
  const county = normalizeQueryValue(sp.county);
  const page = toInt(sp.page, 1);

  const all = await getCemeteries();

  const states = Array.from(
    new Set(
      all
        .map((c) => c.state)
        .filter(Boolean)
        .map((s) => s.toUpperCase()),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const countiesForState = Array.from(
    new Set(
      all
        .filter((c) => (state ? c.state.toUpperCase() === state : true))
        .map((c) => c.county)
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const needle = q.toLowerCase();

  const filtered = all.filter((c) => {
    if (state && c.state.toUpperCase() !== state) return false;
    if (county && c.county !== county) return false;
    if (!needle) return true;

    const hay =
      `${c.name} ${c.address1} ${c.city} ${c.county} ${c.state} ${c.zip}`.toLowerCase();
    return hay.includes(needle);
  });

  // Stable, predictable ordering for SEO + usability.
  filtered.sort((a, b) => {
    const byCounty = a.county.localeCompare(b.county);
    if (byCounty) return byCounty;
    const byCity = a.city.localeCompare(b.city);
    if (byCity) return byCity;
    return a.name.localeCompare(b.name);
  });

  const pageSize = 25;
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const rows = filtered.slice(startIdx, startIdx + pageSize);

  const baseParams = { q, state, county };

  const clearHref = "/cemeteries-we-serve";

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-8 shadow-sm backdrop-blur sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary),transparent_60%)]/[14]" />
        <div className="space-y-4">
          <Badge className="w-fit" variant="secondary">
            <MapPin className="mr-1.5 h-3.5 w-3.5" />
            Cemeteries We Serve
          </Badge>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Find your cemetery quickly—without scrolling thousands of rows.
          </h1>
          <p className="max-w-3xl text-pretty text-base text-muted-foreground sm:text-lg">
            Search by cemetery name, city, ZIP, or county. Use filters to narrow
            results and open directions in one click.
          </p>
        </div>
      </section>

      <Card className="overflow-hidden">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl">Search & filter</CardTitle>
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {total.toLocaleString()}
            </span>{" "}
            matches.
          </p>
        </CardHeader>
        <CardContent>
          <form
            method="get"
            className="grid gap-4 md:grid-cols-[1.4fr_0.8fr_0.9fr_auto] md:items-end"
          >
            <div className="space-y-2">
              <Label htmlFor="q">Search</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="q"
                  name="q"
                  defaultValue={q}
                  placeholder="e.g. Hudson, Stow, Lake View, 44236…"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <select
                id="state"
                name="state"
                defaultValue={state}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">All states</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="county">County</Label>
              <select
                id="county"
                name="county"
                defaultValue={county}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">All counties</option>
                {countiesForState.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <Button type="submit">Apply</Button>
              {(q || state || county) && (
                <Button asChild type="button" variant="outline">
                  <Link href={clearHref}>
                    <X className="mr-2 h-4 w-4" />
                    Clear
                  </Link>
                </Button>
              )}
            </div>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Tip:</span>
            Try searching “Union”, “Memorial”, or a ZIP to narrow quickly.
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {rows.map((c) => {
          const mapsUrl = buildMapsUrl(c);
          return (
            <Card
              key={`${c.credentialNumber}-${c.name}-${c.address1}`}
              className="border-border/60"
            >
              <CardContent className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <div className="text-base font-semibold text-foreground">
                      {c.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {c.address1 ? `${c.address1}, ` : ""}
                      {c.city ? `${c.city}, ` : ""}
                      {c.state} {c.zip}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {c.county ? (
                        <Badge
                          variant="secondary"
                          className="bg-primary/5 text-primary border-primary/20"
                        >
                          {c.county} County
                        </Badge>
                      ) : null}
                      {c.credentialNumber ? (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground"
                        >
                          {c.credentialNumber}
                        </Badge>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="group"
                    >
                      <a href={mapsUrl} target="_blank" rel="noreferrer">
                        Directions
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {total === 0 ? (
          <Card>
            <CardContent className="p-10 text-center text-sm text-muted-foreground">
              No matches found. Try a different search term, or clear filters.
            </CardContent>
          </Card>
        ) : null}
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          Page <span className="font-medium text-foreground">{safePage}</span>{" "}
          of <span className="font-medium text-foreground">{totalPages}</span>
        </div>

        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            disabled={safePage <= 1}
            aria-disabled={safePage <= 1}
          >
            <Link
              href={
                safePage <= 1
                  ? "#"
                  : `/cemeteries-we-serve${buildQueryString({
                      ...baseParams,
                      page: String(safePage - 1),
                    })}`
              }
            >
              Previous
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            disabled={safePage >= totalPages}
            aria-disabled={safePage >= totalPages}
          >
            <Link
              href={
                safePage >= totalPages
                  ? "#"
                  : `/cemeteries-we-serve${buildQueryString({
                      ...baseParams,
                      page: String(safePage + 1),
                    })}`
              }
            >
              Next
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
