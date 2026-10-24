import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/MemoryIndexPage"), import("@/app/withTheme")]).then(
    ([p, t]) => ({
      default: t.withTheme(p.default),
    }),
  ),
);

export const Route = createFileRoute("/memory/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Civic Memory — Ghar2Kendra" },
      {
        name: "description",
        content: "The full repair history of every road, drain and transformer in your ward.",
      },
      { property: "og:title", content: "Civic Memory — Ghar2Kendra" },
      {
        property: "og:description",
        content: "The full repair history of every road, drain and transformer in your ward.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
