// node_modules/.nitro/vite/services/ssr/assets/time-CSlph-K_.js
var EARTH_RADIUS_M = 6371e3;
var toRad = (deg) => deg * Math.PI / 180;
/** Great-circle distance between two points in metres (Haversine). */
function distanceMeters(lat1, lng1, lat2, lng2) {
	const dLat = toRad(lat2 - lat1);
	const dLng = toRad(lng2 - lng1);
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
	return EARTH_RADIUS_M * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
/**
* Shortest distance in metres from a point to the segment a→b.
* Uses an equirectangular projection, which is accurate enough at city scale.
*/
function distanceToSegmentMeters(point, a, b) {
	const refLat = toRad((a.lat + b.lat) / 2);
	const project = (p) => ({
		x: toRad(p.lng) * Math.cos(refLat) * EARTH_RADIUS_M,
		y: toRad(p.lat) * EARTH_RADIUS_M
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
function centroid(points) {
	if (!points.length) return null;
	const sum = points.reduce((acc, p) => ({
		lat: acc.lat + p.lat,
		lng: acc.lng + p.lng
	}), {
		lat: 0,
		lng: 0
	});
	return {
		lat: sum.lat / points.length,
		lng: sum.lng / points.length
	};
}
var DAY_MS = 864e5;
var HOUR_MS = 36e5;
var UNIT_MS = {
	min: 6e4,
	mins: 6e4,
	minute: 6e4,
	minutes: 6e4,
	hour: HOUR_MS,
	hours: HOUR_MS,
	day: DAY_MS,
	days: DAY_MS,
	week: 7 * DAY_MS,
	weeks: 7 * DAY_MS
};
/** Parse an ISO string or a relative phrase. Returns a Date or null. */
function parseWhen(value, now = /* @__PURE__ */ new Date()) {
	if (!value) return null;
	if (value instanceof Date) return value;
	const iso = Date.parse(value);
	if (!Number.isNaN(iso) && /\d{4}-\d{2}-\d{2}/.test(value)) return new Date(iso);
	const text = String(value).toLowerCase();
	if (text.includes("just now")) return new Date(now);
	const rel = text.match(/(\d+)\s*(mins?|minutes?|hours?|days?|weeks?)\s+ago/);
	if (rel) return new Date(now.getTime() - Number(rel[1]) * UNIT_MS[rel[2]]);
	if (text.startsWith("yesterday")) return /* @__PURE__ */ new Date(now.getTime() - DAY_MS);
	if (text.startsWith("today")) return new Date(now);
	return null;
}
/** When an issue was reported. */
function reportedAt(issue, now = /* @__PURE__ */ new Date()) {
	return parseWhen(issue.reportedAt, now) || parseWhen(issue.createdAt, now) || new Date(now);
}
/** When an issue was resolved, if it was. */
function resolvedAt(issue, now = /* @__PURE__ */ new Date()) {
	if (issue.resolvedAt) return parseWhen(issue.resolvedAt, now);
	if (issue.status !== "resolved" && issue.status !== "verified") return null;
	return parseWhen([...issue.timeline || []].reverse().find((t) => /resolved|completed|sealed/i.test(t.step))?.date, now) || reportedAt(issue, now);
}
/** When residents verified the fix, if they did. */
function verifiedAt(issue, now = /* @__PURE__ */ new Date()) {
	if (issue.verifiedAt) return parseWhen(issue.verifiedAt, now);
	return issue.status === "verified" ? resolvedAt(issue, now) : null;
}
function daysBetween(a, b) {
	return Math.abs(b.getTime() - a.getTime()) / DAY_MS;
}
function formatDate(date) {
	if (!date) return "—";
	return date.toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function timeAgo(date, now = /* @__PURE__ */ new Date()) {
	if (!date) return "—";
	const diff = now.getTime() - date.getTime();
	if (diff < 36e5) return `${Math.max(1, Math.round(diff / 6e4))} min ago`;
	if (diff < 864e5) return `${Math.round(diff / HOUR_MS)} h ago`;
	const days = Math.round(diff / DAY_MS);
	if (days < 45) return `${days} d ago`;
	return formatDate(date);
}
export { DAY_MS, HOUR_MS, centroid, daysBetween, distanceMeters, distanceToSegmentMeters, formatDate, parseWhen, reportedAt, resolvedAt, timeAgo, verifiedAt };
