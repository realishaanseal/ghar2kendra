import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { ThemeContext } from "./AppShell-sPIu6wGQ.mjs";
// node_modules/.nitro/vite/services/ssr/assets/withTheme-BVg39VIW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function withTheme(Page) {
	return function ThemedPage() {
		const isDarkMode = (0, import_react.useContext)(ThemeContext);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { isDarkMode });
	};
}
export { withTheme };
