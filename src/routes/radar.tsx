import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/RadarPage"), import("@/app/withTheme")]).then(([p, t]) => ({
    default: t.withTheme(p.default),
  })),
);

export const Route = createFileRoute("/radar")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Neighborhood Radar — Ghar2Kendra" },
      {
        name: "description",
        content:
          "Follow your road, college, market or commute and see only the civic issues that matter there.",
      },
      { property: "og:title", content: "Neighborhood Radar — Ghar2Kendra" },
      {
        property: "og:description",
        content:
          "Follow your road, college, market or commute and see only the civic issues that matter there.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
