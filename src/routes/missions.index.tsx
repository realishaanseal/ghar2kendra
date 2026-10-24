import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/MissionsPage"), import("@/app/withTheme")]).then(([p, t]) => ({
    default: t.withTheme(p.default),
  })),
);

export const Route = createFileRoute("/missions/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Civic Missions — Ghar2Kendra" },
      {
        name: "description",
        content: "Turn many reports of one problem into one coordinated, public project.",
      },
      { property: "og:title", content: "Civic Missions — Ghar2Kendra" },
      {
        property: "og:description",
        content: "Turn many reports of one problem into one coordinated, public project.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
