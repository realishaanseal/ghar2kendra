// Client for the backend's advisory AI endpoints. Every call has an offline fallback,
// and results are labelled advisory: they flag things for humans, they never decide.

async function postJson(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} responded ${res.status}`);
  return res.json();
}

/** Ask Gemini whether the after-photo plausibly shows the same spot with the defect fixed. */
export async function compareProofPhotos(beforeUrl, afterUrl, category) {
  try {
    const data = await postJson('/api/compare-proof', { beforeUrl, afterUrl, category });
    return { available: true, ...data };
  } catch (err) {
    console.warn('compare-proof unavailable, using fallback', err);
    return {
      available: false,
      summary: 'The AI service is offline, so the photos were not compared. Rely on resident attestations and the reviewer.',
      flags: afterUrl ? [] : ['No after-photo uploaded'],
    };
  }
}
