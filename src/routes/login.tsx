import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

const Page = lazyRouteComponent(() =>
  Promise.all([import("@/app/pages/LoginPage"), import("@/app/withTheme")]).then(([p, t]) => ({
    default: t.withTheme(p.default),
  })),
);

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — Ghar2Kendra" },
      { name: "description", content: "Sign in as a citizen or an official to Ghar2Kendra." },
      { property: "og:title", content: "Sign in — Ghar2Kendra" },
      {
        property: "og:description",
        content: "Sign in as a citizen or an official to Ghar2Kendra.",
      },
    ],
  }),
  // Load the page chunk before rendering so the lazy component never suspends mid-render.
  loader: () => Page.preload?.(),
  component: Page,
});
