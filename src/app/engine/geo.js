// Small geo helpers shared by the civic engines. Pure functions, no browser APIs.

const EARTH_RADIUS_M = 6371e3;
const toRad = (deg) => (deg * Math.PI) / 180;

/** Great-circle distance between two points in metres (Haversine). */
export function distanceMeters(lat1, lng1, lat2, lng2) {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_M * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Shortest distance in metres from a point to the segment a→b.
 * Uses an equirectangular projection, which is accurate enough at city scale.
 */
export function distanceToSegmentMeters(point, a, b) {
  const refLat = toRad((a.lat + b.lat) / 2);
  const project = (p) => ({
    x: toRad(p.lng) * Math.cos(refLat) * EARTH_RADIUS_M,
    y: toRad(p.lat) * EARTH_RADIUS_M,
  });
  const p = project(point);
  const pa = project(a);
  const pb = project(b);
  const dx = pb.x - pa.x;
  const dy = pb.y - pa.y;
  const lenSq = dx * dx + dy * dy;
  const t = lenSq === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - pa.x) * dx + (p.y - pa.y) * dy) / lenSq));
  return Math.hypot(p.x - (pa.x + t * dx), p.y - (pa.y + t * dy));
}

/** Mean centre of a list of {lat, lng} points. */
export function centroid(points) {
  if (!points.length) return null;
  const sum = points.reduce((acc, p) => ({ lat: acc.lat + p.lat, lng: acc.lng + p.lng }), { lat: 0, lng: 0 });
  return { lat: sum.lat / points.length, lng: sum.lng / points.length };
}
