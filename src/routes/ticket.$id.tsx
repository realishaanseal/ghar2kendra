import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/TicketDetail"), import("@/app/withTheme")]).then(([p, t]) => ({
    default: t.withTheme(p.default),
  })),
);

export const Route = createFileRoute("/ticket/$id")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Ticket — Ghar2Kendra" },
      { name: "description", content: "Track the status and timeline of a civic grievance." },
      { property: "og:title", content: "Ticket — Ghar2Kendra" },
      {
        property: "og:description",
        content: "Track the status and timeline of a civic grievance.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
