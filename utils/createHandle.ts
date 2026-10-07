export function createHandle(...parts: string[]): string {
  return parts
    .filter(Boolean) // remove empty strings or undefined
    .map((part) =>
      part
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // remove special chars
        .replace(/\s+/g, "-") // replace spaces with '-'
    )
    .join("-");
}
