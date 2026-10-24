import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/HomePage"), import("@/app/withTheme")]).then(([p, t]) => ({
    default: t.withTheme(p.default),
  })),
);

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Ghar2Kendra — Citizen to Governance Portal" },
      {
        name: "description",
        content:
          "Report civic issues in your ward and track them from your home to the government office.",
      },
      { property: "og:title", content: "Ghar2Kendra — Citizen to Governance Portal" },
      {
        property: "og:description",
        content:
          "Report civic issues in your ward and track them from your home to the government office.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
