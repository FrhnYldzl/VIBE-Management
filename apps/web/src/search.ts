/** API'deki normalize ile aynı: Türkçe duyarlı, aksan-toleranslı. */
export const norm = (s: string) =>
  s.toLocaleLowerCase("tr")
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
    .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/\s+/g, " ").trim();
