import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/WorkspaceDetailPage"), import("@/app/withTheme")]).then(
    ([p, t]) => ({
      default: t.withTheme(p.default),
    }),
  ),
);

export const Route = createFileRoute("/workspaces/$id")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Workspace — Ghar2Kendra" },
      {
        name: "description",
        content: "Issue assignment, staff, maintenance history and analytics for an organisation.",
      },
      { property: "og:title", content: "Workspace — Ghar2Kendra" },
      {
        property: "og:description",
        content: "Issue assignment, staff, maintenance history and analytics for an organisation.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
