import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/InsightsPage"), import("@/app/withTheme")]).then(([p, t]) => ({
    default: t.withTheme(p.default),
  })),
);

export const Route = createFileRoute("/insights")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Civic Intelligence — Ghar2Kendra" },
      {
        name: "description",
        content:
          "Infrastructure patterns detected across separate civic complaints, with the evidence behind each.",
      },
      { property: "og:title", content: "Civic Intelligence — Ghar2Kendra" },
      {
        property: "og:description",
        content:
          "Infrastructure patterns detected across separate civic complaints, with the evidence behind each.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
