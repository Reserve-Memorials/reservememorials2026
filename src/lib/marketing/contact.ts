export const MARKETING_CONTACT = {
  company: "Reserve Memorials",
  address: "30 Ravenna Street, Hudson, Ohio 44236",
  phone: "(234) 269-5432",
  email: "mark@reservememorials.com",
} as const;

export function phoneToTel(phone: string) {
  const digits = phone.replace(/[^0-9]/g, "");
  // If a 10-digit US number, prefix +1
  if (digits.length === 10) return `+1${digits}`;
  if (digits.startsWith("1") && digits.length === 11) return `+${digits}`;
  return `+${digits}`;
}

export const MARKETING_PORTAL_URL =
  "https://portal.reservememorials.com" as const;
export const MARKETING_PORTAL_DESIGN_URL =
  `${MARKETING_PORTAL_URL}/design` as const;
