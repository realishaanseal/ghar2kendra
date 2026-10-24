import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/WorkspacesPage"), import("@/app/withTheme")]).then(([p, t]) => ({
    default: t.withTheme(p.default),
  })),
);

export const Route = createFileRoute("/workspaces/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "G2K Workspaces — Ghar2Kendra" },
      {
        name: "description",
        content:
          "Operations workspaces for colleges, residents' associations, NGOs and municipal offices.",
      },
      { property: "og:title", content: "G2K Workspaces — Ghar2Kendra" },
      {
        property: "og:description",
        content:
          "Operations workspaces for colleges, residents' associations, NGOs and municipal offices.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
