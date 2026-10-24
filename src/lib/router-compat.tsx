// Thin adapter so the original pages keep their navigation calls while running on TanStack Router.
import {
  Link as TsLink,
  useNavigate as useTsNavigate,
  useParams as useTsParams,
  useLocation as useTsLocation,
} from "@tanstack/react-router";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; children?: ReactNode };

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...rest }, ref) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TsLink ref={ref} to={to as any} {...(rest as any)} />;
});

export function useNavigate() {
  const navigate = useTsNavigate();
  return (to: string | number, opts?: { replace?: boolean }) => {
    if (typeof to === "number") {
      window.history.go(to);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to: to as any, replace: Boolean(opts?.replace) });
  };
}

export function useParams(): Record<string, string> {
  return useTsParams({ strict: false }) as Record<string, string>;
}

export function useLocation() {
  return useTsLocation();
}
