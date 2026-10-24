// Reverse geocoding through OpenStreetMap Nominatim (usage policy: identify the app, low volume).

export function parseCoordinates(lat: string | null, lon: string | null) {
  const latitude = Number(lat);
  const longitude = Number(lon);
  const valid =
    lat !== null &&
    lon !== null &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180;
  return valid ? { latitude, longitude } : null;
}

export async function reverseGeocode(latitude: number, longitude: number) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("format", "jsonv2");

  const response = await fetch(url, {
    headers: { "User-Agent": "Ghar2Kendra/0.5 (civic grievance platform)" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Geocoder responded with ${response.status}`);
  const data = (await response.json()) as { display_name?: string };
  return {
    address: data.display_name ?? null,
    latitude,
    longitude,
    attribution: "© OpenStreetMap contributors",
  };
}
