// Followed places for the Neighborhood Impact Radar, stored per browser.

const STORAGE_KEY = 'g2k_radar_places_v1';
export const RADAR_EVENT = 'civic-radar-updated';

const SEED = [
  { id: 'pl-home', label: 'Home: South Extension', kind: 'home', lat: 28.6145, lng: 77.2095, radiusM: 600, interests: [] },
  { id: 'pl-college', label: 'Karol Bagh Girls College', kind: 'college', lat: 28.6401, lng: 77.19, radiusM: 400, interests: [] },
  { id: 'pl-market', label: 'Lajpat Nagar market', kind: 'market', lat: 28.608, lng: 77.22, radiusM: 400, interests: [] },
];

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to read followed places', err);
  }
  return structuredClone(SEED);
}

function write(places) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
  window.dispatchEvent(new CustomEvent(RADAR_EVENT));
}

export function getFollowedPlaces() {
  return read();
}

export function followPlace({ label, kind = 'other', lat, lng, radiusM = 400, interests = [] }) {
  const place = { id: `pl-${Date.now()}`, label, kind, lat, lng, radiusM, interests };
  write([...read(), place]);
  return place;
}

export function unfollowPlace(id) {
  write(read().filter((p) => p.id !== id));
}

export function updatePlace(id, patch) {
  write(read().map((p) => (p.id === id ? { ...p, ...patch } : p)));
}
