import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/AdminDashboard"), import("@/app/withTheme")]).then(([p, t]) => ({
    default: t.withTheme(p.default),
  })),
);

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Officials Dashboard — Ghar2Kendra" },
      {
        name: "description",
        content: "Triage, assign and resolve civic grievances in your jurisdiction.",
      },
      { property: "og:title", content: "Officials Dashboard — Ghar2Kendra" },
      {
        property: "og:description",
        content: "Triage, assign and resolve civic grievances in your jurisdiction.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
