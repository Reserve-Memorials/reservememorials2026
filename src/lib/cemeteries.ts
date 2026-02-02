import { readFile } from "node:fs/promises";
import path from "node:path";

export type CemeteryRecord = {
  credentialNumber: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
  county: string;
};

type RawCemeteryRecord = {
  "Credential Number"?: string;
  Name?: string;
  Address1?: string;
  City?: string;
  State?: string;
  Zip?: string;
  County?: string;
};

let cemeteriesPromise: Promise<CemeteryRecord[]> | null = null;

export async function getCemeteries(): Promise<CemeteryRecord[]> {
  if (!cemeteriesPromise) {
    cemeteriesPromise = (async () => {
      const filePath = path.join(
        process.cwd(),
        "docs",
        "Cemeteries with addresses.json",
      );
      const raw = await readFile(filePath, "utf8");
      const parsed = JSON.parse(raw) as RawCemeteryRecord[];

      const normalized: CemeteryRecord[] = parsed.map((r) => ({
        credentialNumber: (r["Credential Number"] ?? "").trim(),
        name: (r.Name ?? "").trim(),
        address1: (r.Address1 ?? "").trim(),
        city: (r.City ?? "").trim(),
        state: (r.State ?? "").trim(),
        zip: (r.Zip ?? "").trim(),
        county: (r.County ?? "").trim(),
      }));

      // Drop empty rows just in case.
      return normalized.filter(
        (r) => r.name || r.address1 || r.city || r.county || r.zip,
      );
    })();
  }

  return cemeteriesPromise;
}
