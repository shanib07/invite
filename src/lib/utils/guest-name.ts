const allowedName = /^[\p{L}\p{N} .'-]+$/u;

export function guestNameFromPath(value: string) {
  const normalized = value
    .normalize("NFKC")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized || normalized.length > 120 || !allowedName.test(normalized)) {
    return null;
  }

  return normalized
    .split(" ")
    .map((part) => part.charAt(0).toLocaleUpperCase("en-IN") + part.slice(1))
    .join(" ");
}

export function guestKey(name: string) {
  return name
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("en-IN");
}
