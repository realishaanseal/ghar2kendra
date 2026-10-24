globalThis.__nitro_main__ = import.meta.url;
import { H3Core, HTTPError, NodeResponse, composeMiddleware, createMatcherFromFind, defineHandler, defineLazyEventHandler, headers, memoizeRouteRulesMatcher, serve, toEventHandler } from "./_libs/h3+rou3+srvx.mjs";
import { HookableCore } from "./_libs/hookable.mjs";
import { decodePath, joinURL, withLeadingSlash, withoutTrailingSlash } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
// #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-24T17:25:09.535Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AdminDashboard-Dcp5QMLs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae89-UeJ+SdsWW9g5Af1vUu1py8+8mK0\"",
		"mtime": "2026-10-24T17:25:08.905Z",
		"size": 44681,
		"path": "../public/assets/AdminDashboard-Dcp5QMLs.js"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"2532-P1u486agW3ymimJYHS3VvIiBLK8\"",
		"mtime": "2026-10-24T17:25:09.535Z",
		"size": 9522,
		"path": "../public/favicon.svg"
	},
	"/assets/AppShell-Brfp1f51.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f39-UjDVTpzHNZptqvT5ejJIlMoT1QY\"",
		"mtime": "2026-10-24T17:25:08.907Z",
		"size": 16185,
		"path": "../public/assets/AppShell-Brfp1f51.js"
	},
	"/assets/AppShell-vh-t_kPv.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"3af7-hJRdDJQQrsTdSxJ69xb7a611WZ4\"",
		"mtime": "2026-10-24T17:25:08.917Z",
		"size": 15095,
		"path": "../public/assets/AppShell-vh-t_kPv.css"
	},
	"/assets/AssetMemoryPage-DW03WFHL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1988-Rrk87SrBcpXHYyFgPVcc7kxWluQ\"",
		"mtime": "2026-10-24T17:25:08.907Z",
		"size": 6536,
		"path": "../public/assets/AssetMemoryPage-DW03WFHL.js"
	},
	"/assets/Circle-Cze3KiVf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-DG0hVN3slQ8YEaic9J/nvBBBCC4\"",
		"mtime": "2026-10-24T17:25:08.907Z",
		"size": 286,
		"path": "../public/assets/Circle-Cze3KiVf.js"
	},
	"/assets/AuthContext-DI2gx1M3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"743-mjCuR9s0RCiNBRWvVWBqTEqCP9s\"",
		"mtime": "2026-10-24T17:25:08.907Z",
		"size": 1859,
		"path": "../public/assets/AuthContext-DI2gx1M3.js"
	},
	"/assets/HomePage-B7f_MBPD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6693-m3DbsaoEtaHwSD+N5yO9G0UwHxo\"",
		"mtime": "2026-10-24T17:25:08.908Z",
		"size": 26259,
		"path": "../public/assets/HomePage-B7f_MBPD.js"
	},
	"/assets/MemoryIndexPage-DatfpfCM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b79-1Or3ebbUYaD9jKWO9HLik7ebATM\"",
		"mtime": "2026-10-24T17:25:08.908Z",
		"size": 2937,
		"path": "../public/assets/MemoryIndexPage-DatfpfCM.js"
	},
	"/assets/MemoryParts-CyNG2qSr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d85-2l4hDYKayD0BsGx9OHqd8fTreOc\"",
		"mtime": "2026-10-24T17:25:08.908Z",
		"size": 3461,
		"path": "../public/assets/MemoryParts-CyNG2qSr.js"
	},
	"/assets/LoginPage-BcoKLa7O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5bca-wBiGNAHwc2///sCgUbtYRAA1Sb8\"",
		"mtime": "2026-10-24T17:25:08.908Z",
		"size": 23498,
		"path": "../public/assets/LoginPage-BcoKLa7O.js"
	},
	"/assets/MissionDetailPage-CXLfZifS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"313b-UsZl68Fjh/OE//58h4KM0ep+J5U\"",
		"mtime": "2026-10-24T17:25:08.908Z",
		"size": 12603,
		"path": "../public/assets/MissionDetailPage-CXLfZifS.js"
	},
	"/assets/MissionsPage-BQL1BEM6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12ff-IN0wTWLRgQaYsw48iiQ3WAW5zT8\"",
		"mtime": "2026-10-24T17:25:08.908Z",
		"size": 4863,
		"path": "../public/assets/MissionsPage-BQL1BEM6.js"
	},
	"/assets/RadarPage-Cn_RCrC8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3931-ri3DUoaIpYRRNAFCzF/icQP4CgE\"",
		"mtime": "2026-10-24T17:25:08.908Z",
		"size": 14641,
		"path": "../public/assets/RadarPage-Cn_RCrC8.js"
	},
	"/assets/InsightsPage-Bdf7aeCb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ead-nWXLBu49e5G4wGFbf/3rQ3V48v8\"",
		"mtime": "2026-10-24T17:25:08.908Z",
		"size": 16045,
		"path": "../public/assets/InsightsPage-Bdf7aeCb.js"
	},
	"/assets/ReportPage-BwaG8-ho.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"608e-b7y2Z+Nw13jKN9MTDdYv+UOL0Mc\"",
		"mtime": "2026-10-24T17:25:08.908Z",
		"size": 24718,
		"path": "../public/assets/ReportPage-BwaG8-ho.js"
	},
	"/assets/TicketDetail-CyKu8SyC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a68d-qOp/l0FR69BZgF0ramjvqbg142w\"",
		"mtime": "2026-10-24T17:25:08.908Z",
		"size": 42637,
		"path": "../public/assets/TicketDetail-CyKu8SyC.js"
	},
	"/assets/WorkspacesPage-BY5nk9Hn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a4-1MZMRn0zWMusBZUela2E+VOPMjI\"",
		"mtime": "2026-10-24T17:25:08.912Z",
		"size": 4516,
		"path": "../public/assets/WorkspacesPage-BY5nk9Hn.js"
	},
	"/assets/TileLayer-WVdr0BMP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25305-sTu1d/nnG+P/21IGyChZZxMeNG8\"",
		"mtime": "2026-10-24T17:25:08.908Z",
		"size": 152325,
		"path": "../public/assets/TileLayer-WVdr0BMP.js"
	},
	"/assets/WorkspaceDetailPage-Cw0D6CX4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cfdf-inVdoHbDTFcObjXqVBLqeFNOajI\"",
		"mtime": "2026-10-24T17:25:08.909Z",
		"size": 380895,
		"path": "../public/assets/WorkspaceDetailPage-Cw0D6CX4.js"
	},
	"/assets/admin-BbhsaJge.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-jBYTpvtLSFWfbNOvVHZTHoSufvQ\"",
		"mtime": "2026-10-24T17:25:08.912Z",
		"size": 48,
		"path": "../public/assets/admin-BbhsaJge.js"
	},
	"/assets/aiAdvisory-DSsfBUt5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"414-9+4LRGZvrXilRHNNMjijPyJXBQs\"",
		"mtime": "2026-10-24T17:25:08.912Z",
		"size": 1044,
		"path": "../public/assets/aiAdvisory-DSsfBUt5.js"
	},
	"/assets/arrow-left-DmXx60tB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-c3j6juQvwgUq3WwzX4A25rbgJW4\"",
		"mtime": "2026-10-24T17:25:08.912Z",
		"size": 202,
		"path": "../public/assets/arrow-left-DmXx60tB.js"
	},
	"/assets/Tooltip-C5b16pQ9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34e-Y4CJLtSuoH8wrmGucdOsQeqxF7o\"",
		"mtime": "2026-10-24T17:25:08.909Z",
		"size": 846,
		"path": "../public/assets/Tooltip-C5b16pQ9.js"
	},
	"/assets/arrow-right-C87l4yxf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-sw0KTCndHvz+5cI5BJ4DWw9ApSc\"",
		"mtime": "2026-10-24T17:25:08.912Z",
		"size": 202,
		"path": "../public/assets/arrow-right-C87l4yxf.js"
	},
	"/assets/award-RRqjbwbF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"137-G4Jd2XtM5nHkXiO82IgpNXDUYgs\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 311,
		"path": "../public/assets/award-RRqjbwbF.js"
	},
	"/assets/bell-C_B2DYTt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-uDkrXqXUelvaAA3w7KmhqFyAWus\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 327,
		"path": "../public/assets/bell-C_B2DYTt.js"
	},
	"/assets/briefcase-ixc5MeqH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-jmY8ixBfQEZKme3M4kBwqO58RKU\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 257,
		"path": "../public/assets/briefcase-ixc5MeqH.js"
	},
	"/assets/building-complex-li7gL38w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1-hb0mxT0UyO1Oc0AqjdtHQdshWXw\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 449,
		"path": "../public/assets/building-complex-li7gL38w.js"
	},
	"/assets/check-Cs_BHiGU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a1-UNDR24zyEIOVRGeSB4Eqe0/8+FA\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 161,
		"path": "../public/assets/check-Cs_BHiGU.js"
	},
	"/assets/circle-alert-C0Ilg17t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"138-0DJNfaJ0AekUefRzhTIBP+cPhVc\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 312,
		"path": "../public/assets/circle-alert-C0Ilg17t.js"
	},
	"/assets/circle-check-YcJA2lvX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7-uBa9JCl5IGRQDQxZkSpLa+ZUsp4\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 247,
		"path": "../public/assets/circle-check-YcJA2lvX.js"
	},
	"/assets/clock-DJlFGxh7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-obH3uDDnxmrrvbjxU3BTxXFNozM\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 206,
		"path": "../public/assets/clock-DJlFGxh7.js"
	},
	"/assets/cloud-upload-gLIsU_75.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"139-6qoYsRAlZl0wFneJt2ii5xLk0kY\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 313,
		"path": "../public/assets/cloud-upload-gLIsU_75.js"
	},
	"/assets/external-link-HEjJCYcj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"120-HTBybIeVtQPsfi6GO50h2U46+nQ\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 288,
		"path": "../public/assets/external-link-HEjJCYcj.js"
	},
	"/assets/file-text-CKguovkV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-K1swnGLg37TvR67i4OVOvlOh2AQ\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 422,
		"path": "../public/assets/file-text-CKguovkV.js"
	},
	"/assets/flag-re3NCi71.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123-DbnpDioAn62fQe+ceFnXW4T7KBY\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 291,
		"path": "../public/assets/flag-re3NCi71.js"
	},
	"/assets/index-ECR_tonp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a93e-d5jtywvizOq5bGoJU4uAogEorls\"",
		"mtime": "2026-10-24T17:25:08.901Z",
		"size": 371006,
		"path": "../public/assets/index-ECR_tonp.js"
	},
	"/assets/info-DRgU6G3E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-gYA7Pjp0lRgE3Y1LQ22/zuITWvM\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 241,
		"path": "../public/assets/info-DRgU6G3E.js"
	},
	"/assets/insights-BZG28CMH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-s2Cf1A58eRmmtLAcYwjV+AKaCr4\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 48,
		"path": "../public/assets/insights-BZG28CMH.js"
	},
	"/assets/locate-fixed-BZpLQnZn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b8-1Qi0DIEs6ZGbkgTWwHSbDL+djnA\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 440,
		"path": "../public/assets/locate-fixed-BZpLQnZn.js"
	},
	"/assets/login-NimB-LrQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-lSjqWdKxtisKc5VjSQ0/kviSLHU\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 48,
		"path": "../public/assets/login-NimB-LrQ.js"
	},
	"/assets/map-pin-DXZ4sNcu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"128-GXcinrrYAXjbl5YwKT91XtHAGQ8\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 296,
		"path": "../public/assets/map-pin-DXZ4sNcu.js"
	},
	"/assets/memory._assetId-DgfpgRIV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-ibmLzVZDDGk8fuzCUlxwAG6WWYY\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 48,
		"path": "../public/assets/memory._assetId-DgfpgRIV.js"
	},
	"/assets/memory.index-DiCNJrop.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-Ojs8tWSOAVAISqzkK3hNjKEIdcI\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 48,
		"path": "../public/assets/memory.index-DiCNJrop.js"
	},
	"/assets/memoryStore-DWYT_rPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c51-/NugBcRLcQ+G0sezWgZ2NAcyUy0\"",
		"mtime": "2026-10-24T17:25:08.913Z",
		"size": 11345,
		"path": "../public/assets/memoryStore-DWYT_rPL.js"
	},
	"/assets/missionStore-o4qlvAe8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae3-f4weS1mHag2G6FJoIOADSMgrLFo\"",
		"mtime": "2026-10-24T17:25:08.914Z",
		"size": 6883,
		"path": "../public/assets/missionStore-o4qlvAe8.js"
	},
	"/assets/missions._id-Cjv4qQy1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-MFAVA23aSroV9LC5l0btPLTpYsw\"",
		"mtime": "2026-10-24T17:25:08.914Z",
		"size": 48,
		"path": "../public/assets/missions._id-Cjv4qQy1.js"
	},
	"/assets/missions.index-DXeTXoaW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-xfCxp48x8bp5vwl+0SdO0qAcgbU\"",
		"mtime": "2026-10-24T17:25:08.914Z",
		"size": 48,
		"path": "../public/assets/missions.index-DXeTXoaW.js"
	},
	"/assets/mockIssues-Mhve31PL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe5-NzD7inbfWjK01w+BojPt+IuqmZo\"",
		"mtime": "2026-10-24T17:25:08.914Z",
		"size": 12261,
		"path": "../public/assets/mockIssues-Mhve31PL.js"
	},
	"/assets/network-BaBirduJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-k/1E5XJGWNUtJJQM8f1urfW41a4\"",
		"mtime": "2026-10-24T17:25:08.914Z",
		"size": 421,
		"path": "../public/assets/network-BaBirduJ.js"
	},
	"/assets/proof-BnS7fyxP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"916-BALY7PzBkwtaUo6EvvcjOAGFlKc\"",
		"mtime": "2026-10-24T17:25:08.914Z",
		"size": 2326,
		"path": "../public/assets/proof-BnS7fyxP.js"
	},
	"/assets/proofStore-DQ5Zqkmw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aeb-ni2rn65SzDCYfrO+FennjLraZxI\"",
		"mtime": "2026-10-24T17:25:08.914Z",
		"size": 2795,
		"path": "../public/assets/proofStore-DQ5Zqkmw.js"
	},
	"/assets/plus-DIHtpeHx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be-j4MItJUqLEwkbL8FmEJZUrjqYzo\"",
		"mtime": "2026-10-24T17:25:08.914Z",
		"size": 190,
		"path": "../public/assets/plus-DIHtpeHx.js"
	},
	"/assets/proxy-BsBYl1Iy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"217ff-O+tde9MhCkVKHyLBMdChM4flXYQ\"",
		"mtime": "2026-10-24T17:25:08.914Z",
		"size": 137215,
		"path": "../public/assets/proxy-BsBYl1Iy.js"
	},
	"/assets/radar-B09Xd8CP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-WuoNL/5KgmGmuWC8Eddzg2jfl9k\"",
		"mtime": "2026-10-24T17:25:08.915Z",
		"size": 48,
		"path": "../public/assets/radar-B09Xd8CP.js"
	},
	"/assets/radar-CGk3Lh_E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21b-oInaQdMR5JXdDXcN++2skFDCD5k\"",
		"mtime": "2026-10-24T17:25:08.915Z",
		"size": 539,
		"path": "../public/assets/radar-CGk3Lh_E.js"
	},
	"/assets/refresh-cw-AMK_G4vy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166-Iz4zkBbwAyE27S5Sw7t/7Jq1I/M\"",
		"mtime": "2026-10-24T17:25:08.915Z",
		"size": 358,
		"path": "../public/assets/refresh-cw-AMK_G4vy.js"
	},
	"/assets/repeat-CA11Y4dn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-++ADFlEj6YgpwHM91bWNN0/r5Ac\"",
		"mtime": "2026-10-24T17:25:08.915Z",
		"size": 309,
		"path": "../public/assets/repeat-CA11Y4dn.js"
	},
	"/assets/report-B5yN0W08.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-ShymEcObgpcQqg+4U2p/8Fnqsxc\"",
		"mtime": "2026-10-24T17:25:08.915Z",
		"size": 48,
		"path": "../public/assets/report-B5yN0W08.js"
	},
	"/assets/rotate-ccw-clock-dykQrIfz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-xXtB47mD7XT7fjJtBtlFt+D0S/o\"",
		"mtime": "2026-10-24T17:25:08.915Z",
		"size": 303,
		"path": "../public/assets/rotate-ccw-clock-dykQrIfz.js"
	},
	"/assets/router-compat-ZUi8RXjs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db7-IxvmUFBjK9o6FciVpLi4E23ZSHs\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 3511,
		"path": "../public/assets/router-compat-ZUi8RXjs.js"
	},
	"/assets/routes-C5Jkp-Nw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-xgwSMoLnmdbUZGg1/Q9ncKhVRuA\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 48,
		"path": "../public/assets/routes-C5Jkp-Nw.js"
	},
	"/assets/search-DQSDo47-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3-JyQQmktKmzQTAC7bErKF3P7YbHo\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 211,
		"path": "../public/assets/search-DQSDo47-.js"
	},
	"/assets/send-BEN0Jd0O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"394-crZ82A0AT/oqCJIm/Bs7KYvF/t0\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 916,
		"path": "../public/assets/send-BEN0Jd0O.js"
	},
	"/assets/shield-check-C1REU8kz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165-9Bxi4HyeeLpOlVfSdHM9b9NRLlA\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 357,
		"path": "../public/assets/shield-check-C1REU8kz.js"
	},
	"/assets/sparkles-C_fT3eUL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"225-BXWfqCJjdWD6XBooj9ipYkEJIJM\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 549,
		"path": "../public/assets/sparkles-C_fT3eUL.js"
	},
	"/assets/styles-BI4WxzQo.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"17327-8hcIqGTFt4FBQuv/lydykxFg7Og\"",
		"mtime": "2026-10-24T17:25:08.917Z",
		"size": 95015,
		"path": "../public/assets/styles-BI4WxzQo.css"
	},
	"/assets/surface-BIze4Fl4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"809-pB+qYCcy6MRzOS94xbGNOtyoaX0\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 2057,
		"path": "../public/assets/surface-BIze4Fl4.js"
	},
	"/assets/supabaseClient-BGgcQbXv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4774-t/TOwmAKUcA1UOwhWATb45Xnqu4\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 18292,
		"path": "../public/assets/supabaseClient-BGgcQbXv.js"
	},
	"/assets/thumbs-up-DJlfBmiF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29c-nOwsia5shLFh42HPu6f9U0H4Mq4\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 668,
		"path": "../public/assets/thumbs-up-DJlfBmiF.js"
	},
	"/assets/ticket._id-BfqHqaAZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-MLenEUEt9ZSi1LuGospZYR3z7XE\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 48,
		"path": "../public/assets/ticket._id-BfqHqaAZ.js"
	},
	"/assets/time-BIzoVa-5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7ec-suFm6suKPiotDZ+Oahx9srRhJjQ\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 2028,
		"path": "../public/assets/time-BIzoVa-5.js"
	},
	"/assets/trees-G7_WXZCJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-V1vQ3FnharKIr5Bnoc9nVe1asAs\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 402,
		"path": "../public/assets/trees-G7_WXZCJ.js"
	},
	"/assets/triangle-alert-CHCRyO_b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"149-LEzk7gupsU71Y0hSNF0z9gW1N+U\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 329,
		"path": "../public/assets/triangle-alert-CHCRyO_b.js"
	},
	"/assets/users-CHvbLyYJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"157-+K2cSrHDhL6M6Xr3mWRIjhFAnK8\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 343,
		"path": "../public/assets/users-CHvbLyYJ.js"
	},
	"/assets/utils-BypgsYmK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e53-rWuDSCdn3tKt/5MUoAD2f5G23Pw\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 11859,
		"path": "../public/assets/utils-BypgsYmK.js"
	},
	"/assets/withTheme-vGU_2eia.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-kH4YD6zehRZkwoCUH+Az9m3rph4\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 278,
		"path": "../public/assets/withTheme-vGU_2eia.js"
	},
	"/assets/workspaces-D83eGrtY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1224-gvevBprS8MVYiEMfzlxM+5vrWeo\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 4644,
		"path": "../public/assets/workspaces-D83eGrtY.js"
	},
	"/assets/workspaces._id-CkdEINfj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-bwkwGWHZvw+j4gZB5w7gv9mkjyc\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 48,
		"path": "../public/assets/workspaces._id-CkdEINfj.js"
	},
	"/assets/workspaces.index-BdDtE-zX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-yo7LBbJ1Onj7ab58wp1czE7ACyY\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 48,
		"path": "../public/assets/workspaces.index-BdDtE-zX.js"
	},
	"/assets/x-CjS6Sc6i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf-Z5Q/Se3fMDOIzQV3lm8WypW7LYU\"",
		"mtime": "2026-10-24T17:25:08.916Z",
		"size": 191,
		"path": "../public/assets/x-CjS6Sc6i.js"
	}
};
// #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
// #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
// node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
// #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = {
		route: "/assets/**",
		rank: 0,
		rules: [{
			name: "headers",
			route: "/assets/**",
			handler: headers,
			options: { "cache-control": "public, max-age=31536000, immutable" }
		}]
	};
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		let s = p.split("/");
		let l = s.length;
		let _w;
		if (l > 1) {
			if (s[1] === "assets") r.push(l > 2 ? {
				data: $0,
				params: {
					"0": _w = p.slice(8),
					_: _w
				}
			} : {
				data: $0,
				params: {}
			});
		}
		return r.reverse();
	};
})();
var _lazy_60f9fdc5e9e03a47 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_60f9fdc5e9e03a47
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
// node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
// #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
// #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => {
		event.context.routeRules = getRouteRules(event.req.method, event.url.pathname).routeRules;
		return findRoute(event.req.method, event.url.pathname);
	};
	h3App["~middleware"].push(createRouteRulesMiddleware());
	h3App["~middleware"].push(...globalMiddleware);
	return h3App;
}
// node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
var _matchRouteRules;
function getRouteRules(method, pathname) {
	return (_matchRouteRules ??= memoizeRouteRulesMatcher(createMatcherFromFind(findRouteRules)))(method, pathname);
}
function createRouteRulesMiddleware() {
	const composed = /* @__PURE__ */ new WeakMap();
	const middleware = (event, next) => {
		const ruleMiddleware = getRouteRules(event.req.method, event.url.pathname).routeRuleMiddleware;
		if (ruleMiddleware.length === 0) return next();
		let chain = composed.get(ruleMiddleware);
		if (!chain) {
			chain = composeMiddleware(ruleMiddleware);
			composed.set(ruleMiddleware, chain);
		}
		return chain(event, next);
	};
	return markUntraced(middleware);
}
function markUntraced(middleware) {
	middleware.__traced__ = true;
	return middleware;
}
// node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
// #nitro/virtual/tracing
var tracingSrvxPlugins = [];
// node_modules/nitro/dist/runtime/internal/shutdown.mjs
function setupCloseHooks(server) {
	const closeServer = server.close.bind(server);
	let closeHooks;
	server.close = (closeActiveConnections) => closeServer(closeActiveConnections).finally(() => closeHooks ??= callCloseHooks());
}
async function callCloseHooks() {
	try {
		await useNitroHooks().callHook("close");
	} catch (error) {
		console.error("[nitro] Error while calling `close` hooks:", error);
	}
}
// node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
setupCloseHooks(serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
}));
trapUnhandledErrors();
var node_server_default = {};
export { node_server_default as default };
