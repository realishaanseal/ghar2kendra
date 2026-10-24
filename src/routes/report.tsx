import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/ReportPage"), import("@/app/withTheme")]).then(([p, t]) => ({
    default: t.withTheme(p.default),
  })),
);

export const Route = createFileRoute("/report")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Report an Issue — Ghar2Kendra" },
      {
        name: "description",
        content: "Snap a photo, pin the location and file a civic grievance with your local body.",
      },
      { property: "og:title", content: "Report an Issue — Ghar2Kendra" },
      {
        property: "og:description",
        content: "Snap a photo, pin the location and file a civic grievance with your local body.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
