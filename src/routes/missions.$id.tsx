import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/MissionDetailPage"), import("@/app/withTheme")]).then(
    ([p, t]) => ({
      default: t.withTheme(p.default),
    }),
  ),
);

export const Route = createFileRoute("/missions/$id")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mission — Ghar2Kendra" },
      {
        name: "description",
        content:
          "Evidence, authorities, coordinator, reminders and public progress for a civic mission.",
      },
      { property: "og:title", content: "Mission — Ghar2Kendra" },
      {
        property: "og:description",
        content:
          "Evidence, authorities, coordinator, reminders and public progress for a civic mission.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
