import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Link, useLocation, useNavigate, useParams } from "../_libs/@tanstack/react-router+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/router-compat-BtzFIg6e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Link$1 = (0, import_react.forwardRef)(function Link$2({ to, ...rest }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		ref,
		to,
		...rest
	});
});
function useNavigate$1() {
	const navigate = useNavigate();
	return (to, opts) => {
		if (typeof to === "number") {
			window.history.go(to);
			return;
		}
		navigate({
			to,
			replace: Boolean(opts?.replace)
		});
	};
}
function useParams$1() {
	return useParams({ strict: false });
}
function useLocation$1() {
	return useLocation();
}
export { Link$1, useLocation$1, useNavigate$1, useParams$1 };
