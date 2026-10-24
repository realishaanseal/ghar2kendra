// Fetch remote evidence photos for advisory AI checks, without letting callers reach internal hosts.

/** Only public HTTPS hostnames; never localhost, internal names or IP literals. */
export function isSafeImageUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    const host = url.hostname;
    if (url.protocol !== "https:") return false;
    if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return false;
    if (/^[\d.]+$/.test(host) || host.includes(":")) return false;
    return true;
  } catch {
    return false;
  }
}

export async function fetchImageInline(url: string) {
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`Image fetch responded with ${response.status}`);
  const mimeType = response.headers.get("content-type")?.split(";")[0] || "image/jpeg";
  if (!mimeType.startsWith("image/")) throw new Error("URL is not an image");
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length > 8 * 1024 * 1024) throw new Error("Image too large");
  return { inlineData: { mimeType, data: buffer.toString("base64") } };
}
