// Small helpers shared by the /api route handlers.

export const json = (data: unknown, status = 200) => Response.json(data, { status });

// Vercel Functions reject request bodies above 4.5 MB; the client compresses photos well below this.
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export async function readJsonBody<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}
