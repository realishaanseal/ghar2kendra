import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
// node_modules/.nitro/vite/services/ssr/assets/AuthContext-B2m8Co6B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "civic_user_session";
var DEMO_PROFILES = {
	citizen: {
		id: "cit-001",
		name: "Aarav Sharma",
		role: "citizen",
		phone: "+91 98765 43210",
		email: "aarav.sharma@gmail.com",
		karma: 150,
		ward: "Ward 14 (South Extension, Delhi)",
		avatar: "👨‍💼"
	},
	municipalOfficial: {
		id: "off-102",
		name: "Er. Rajesh Varma",
		role: "official",
		designation: "Junior Engineer (Civil - Division 2)",
		jurisdictionType: "municipality",
		jurisdictionName: "Municipal Corporation of Delhi (MCD South Zone)",
		department: "Public Works Dept (PWD)",
		officerId: "MCD-ENG-4921",
		phone: "+91 98111 22334",
		email: "rajesh.varma@mcd.gov.in",
		avatar: "🏛️"
	},
	panchayatOfficial: {
		id: "pan-204",
		name: "Smt. Gayatri Devi",
		role: "official",
		designation: "Gram Panchayat Pradhan (Sarpanch)",
		jurisdictionType: "panchayat",
		jurisdictionName: "Ramnagar Gram Panchayat (Varanasi Rural Block)",
		department: "Panchayati Raj & Rural Development",
		officerId: "GP-VAR-019",
		phone: "+91 94500 88990",
		email: "gayatri.devi@panchayat.gov.in",
		avatar: "🌾"
	}
};
function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = (0, import_react.useState)(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) return JSON.parse(saved);
		} catch (e) {
			console.warn("Failed to parse saved user session", e);
		}
		return DEMO_PROFILES.citizen;
	});
	(0, import_react.useEffect)(() => {
		try {
			if (currentUser) localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
			else localStorage.removeItem(STORAGE_KEY);
			window.dispatchEvent(new CustomEvent("civic-auth-changed", { detail: currentUser }));
		} catch (e) {
			console.error("Failed to sync auth session", e);
		}
	}, [currentUser]);
	const login = (userData) => {
		setCurrentUser(userData);
	};
	const logout = () => {
		setCurrentUser(null);
	};
	const loginAsDemo = (demoKey) => {
		const profile = DEMO_PROFILES[demoKey] || DEMO_PROFILES.citizen;
		setCurrentUser(profile);
		return profile;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			currentUser,
			isLoggedIn: Boolean(currentUser),
			isCitizen: currentUser?.role === "citizen",
			isOfficial: currentUser?.role === "official",
			login,
			logout,
			loginAsDemo
		},
		children
	});
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}
export { AuthProvider, useAuth };
