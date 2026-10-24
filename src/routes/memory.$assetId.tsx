import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/AssetMemoryPage"), import("@/app/withTheme")]).then(
    ([p, t]) => ({
      default: t.withTheme(p.default),
    }),
  ),
);

export const Route = createFileRoute("/memory/$assetId")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Asset History — Ghar2Kendra" },
      {
        name: "description",
        content:
          "Reports, repairs, verifications and recurrence for one piece of public infrastructure.",
      },
      { property: "og:title", content: "Asset History — Ghar2Kendra" },
      {
        property: "og:description",
        content:
          "Reports, repairs, verifications and recurrence for one piece of public infrastructure.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
