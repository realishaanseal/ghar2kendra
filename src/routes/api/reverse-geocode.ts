import { createFileRoute } from "@tanstack/react-router";

import { parseCoordinates, reverseGeocode } from "@/server/geocode";
import { json } from "@/server/http";

export const Route = createFileRoute("/api/reverse-geocode")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const params = new URL(request.url).searchParams;
        const coords = parseCoordinates(params.get("lat"), params.get("lon"));
        if (!coords) return json({ error: "Provide valid lat and lon values." }, 400);
        try {
          return json(await reverseGeocode(coords.latitude, coords.longitude));
        } catch (error) {
          console.error("Geocoding error:", error);
          return json({ error: "The location could not be looked up." }, 502);
        }
      },
    },
  },
});
