const displayNames = new Intl.DisplayNames(["es"], { type: "region" });

export function countryCodeFromHeaders(headers: Headers): string | null {
  const code = headers.get("x-vercel-ip-country");
  if (!code || code === "XX" || code === "T1") return null;
  return code.toUpperCase();
}

export function countryNameFromCode(code: string | null): string | null {
  if (!code) return null;
  try {
    return displayNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export function cityFromHeaders(headers: Headers): string | null {
  const city = headers.get("x-vercel-ip-city");
  if (!city) return null;
  try {
    return decodeURIComponent(city);
  } catch {
    return city;
  }
}

export function regionFromHeaders(headers: Headers): string | null {
  const region = headers.get("x-vercel-ip-country-region");
  if (!region) return null;
  try {
    return decodeURIComponent(region);
  } catch {
    return region;
  }
}
