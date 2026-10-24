globalThis.__nitro_main__ = import.meta.url;
import { H3Core, HTTPError, NodeResponse, composeMiddleware, createMatcherFromFind, defineHandler, defineLazyEventHandler, headers, memoizeRouteRulesMatcher, serve, toEventHandler } from "./_libs/h3+rou3+srvx.mjs";
import { HookableCore } from "./_libs/hookable.mjs";
import { decodePath, joinURL, withLeadingSlash, withoutTrailingSlash } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
// #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/apple-touch-icon.png": {
		"type": "image/png",
		"etag": "\"3e1d-KFGhDttfXwKEozkMmJuS4PLib9g\"",
		"mtime": "2026-10-24T19:12:50.774Z",
		"size": 15901,
		"path": "../public/apple-touch-icon.png"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"e5e-UAKAXa9xoxTIYv057d6+YjQuGNo\"",
		"mtime": "2026-10-24T19:12:50.774Z",
		"size": 3678,
		"path": "../public/favicon.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-24T19:12:50.774Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AppShell-DrAXfhq4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66df-HmZIKddfV0CvtwF4E6H912PssQE\"",
		"mtime": "2026-10-24T19:12:50.219Z",
		"size": 26335,
		"path": "../public/assets/AppShell-DrAXfhq4.js"
	},
	"/assets/AppShell-vh-t_kPv.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"3af7-hJRdDJQQrsTdSxJ69xb7a611WZ4\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 15095,
		"path": "../public/assets/AppShell-vh-t_kPv.css"
	},
	"/assets/AssetMemoryPage-D33mMLXC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1988-nqmYKCdUcLCuxQ764ob47MOV7cc\"",
		"mtime": "2026-10-24T19:12:50.219Z",
		"size": 6536,
		"path": "../public/assets/AssetMemoryPage-D33mMLXC.js"
	},
	"/assets/AuthContext-Bwg5z5lC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"743-Kd/pQFFMg799NVxofg6xij+jFi4\"",
		"mtime": "2026-10-24T19:12:50.219Z",
		"size": 1859,
		"path": "../public/assets/AuthContext-Bwg5z5lC.js"
	},
	"/assets/Circle-BPVSBAmE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-ECW6vivj/KytVfeSr28RbISgVTg\"",
		"mtime": "2026-10-24T19:12:50.219Z",
		"size": 286,
		"path": "../public/assets/Circle-BPVSBAmE.js"
	},
	"/assets/HomePage-jvkcqDeX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6693-QmJXvyrAr0G7v9Wx6bLuqzrCD7c\"",
		"mtime": "2026-10-24T19:12:50.219Z",
		"size": 26259,
		"path": "../public/assets/HomePage-jvkcqDeX.js"
	},
	"/assets/InsightsPage-CfiahhXo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ead-w5hpcZpJLEOoNPvYm8R9MAJZLh0\"",
		"mtime": "2026-10-24T19:12:50.219Z",
		"size": 16045,
		"path": "../public/assets/InsightsPage-CfiahhXo.js"
	},
	"/assets/LoginPage-C4bKbxts.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5bca-04N9UJ9MaglSzdj9INCWZn1VsGQ\"",
		"mtime": "2026-10-24T19:12:50.219Z",
		"size": 23498,
		"path": "../public/assets/LoginPage-C4bKbxts.js"
	},
	"/assets/MemoryIndexPage-DDUzGxSF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b79-c1OWj1igyIf7KTtOfm8/BSOnLh4\"",
		"mtime": "2026-10-24T19:12:50.220Z",
		"size": 2937,
		"path": "../public/assets/MemoryIndexPage-DDUzGxSF.js"
	},
	"/assets/MemoryParts-CrPB74jV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d85-rD5ZBlY5Kd37GaroIHjG9NlQ6uY\"",
		"mtime": "2026-10-24T19:12:50.220Z",
		"size": 3461,
		"path": "../public/assets/MemoryParts-CrPB74jV.js"
	},
	"/assets/MissionDetailPage-BSQXAXJG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"313b-0PjlqUcqkVLWPrhTmgqswueLBiI\"",
		"mtime": "2026-10-24T19:12:50.220Z",
		"size": 12603,
		"path": "../public/assets/MissionDetailPage-BSQXAXJG.js"
	},
	"/assets/MissionsPage-B3hsLabI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12ff-aEAVH6RUVVJ0fAKDgWqDnxdsv2E\"",
		"mtime": "2026-10-24T19:12:50.220Z",
		"size": 4863,
		"path": "../public/assets/MissionsPage-B3hsLabI.js"
	},
	"/assets/RadarPage-lAQiK7sS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3931-ChBSEHj68vO6WVfLa+FRzVR0PvA\"",
		"mtime": "2026-10-24T19:12:50.220Z",
		"size": 14641,
		"path": "../public/assets/RadarPage-lAQiK7sS.js"
	},
	"/assets/ReportPage-Dw_yzgsl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"608e-GCtZHURQJojwocRp1Bn7jn31pFE\"",
		"mtime": "2026-10-24T19:12:50.220Z",
		"size": 24718,
		"path": "../public/assets/ReportPage-Dw_yzgsl.js"
	},
	"/assets/TicketDetail-DbgFqkrd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a68d-tQYLs7GCNLkc5Dvauradr+mV6ts\"",
		"mtime": "2026-10-24T19:12:50.220Z",
		"size": 42637,
		"path": "../public/assets/TicketDetail-DbgFqkrd.js"
	},
	"/assets/TileLayer-D8WZ3zW9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25305-SKksuC8K6CXdGnfw9ujgx8jDkcM\"",
		"mtime": "2026-10-24T19:12:50.220Z",
		"size": 152325,
		"path": "../public/assets/TileLayer-D8WZ3zW9.js"
	},
	"/assets/Tooltip-Cdzu61WY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34e-4O3VpS9n7qsnlIbpdtmM8nNh25Q\"",
		"mtime": "2026-10-24T19:12:50.220Z",
		"size": 846,
		"path": "../public/assets/Tooltip-Cdzu61WY.js"
	},
	"/assets/WorkspaceDetailPage-Bp9YENGQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cfdf-Dr7Itd4FhweYv30TI0w6X7E4Enc\"",
		"mtime": "2026-10-24T19:12:50.220Z",
		"size": 380895,
		"path": "../public/assets/WorkspaceDetailPage-Bp9YENGQ.js"
	},
	"/assets/WorkspacesPage-DWuYK2Yp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a4-oU74T7Rnv1fhsx+ILWQHvkJ4W1M\"",
		"mtime": "2026-10-24T19:12:50.220Z",
		"size": 4516,
		"path": "../public/assets/WorkspacesPage-DWuYK2Yp.js"
	},
	"/assets/admin-DM0k6IEh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-XKqHFn1/nX7aL2dKFRQeVwKkrfM\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 48,
		"path": "../public/assets/admin-DM0k6IEh.js"
	},
	"/assets/aiAdvisory-DSsfBUt5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"414-9+4LRGZvrXilRHNNMjijPyJXBQs\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 1044,
		"path": "../public/assets/aiAdvisory-DSsfBUt5.js"
	},
	"/assets/AdminDashboard-5kXWxhmE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae89-qyG+9+JjPb9cUCLM4VO8La823G8\"",
		"mtime": "2026-10-24T19:12:50.219Z",
		"size": 44681,
		"path": "../public/assets/AdminDashboard-5kXWxhmE.js"
	},
	"/assets/arrow-left-BDzt8nUw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-1BmUqXL+/sYJSQIB9DZb6RZvZE0\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 202,
		"path": "../public/assets/arrow-left-BDzt8nUw.js"
	},
	"/assets/arrow-right-BsQEYB3X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-JKqzEzr1LpqqDvUFfIelpvAXg/0\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 202,
		"path": "../public/assets/arrow-right-BsQEYB3X.js"
	},
	"/assets/award-BBsA-Nxn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"137-jzIjtlT2OOlPBDr8Mm2vhHzefBk\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 311,
		"path": "../public/assets/award-BBsA-Nxn.js"
	},
	"/assets/bell-UVKj-iZZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-CVzwHb+MYj3uQrpgHHJM6PX/How\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 327,
		"path": "../public/assets/bell-UVKj-iZZ.js"
	},
	"/assets/briefcase-BknW5TJD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-9OpcKpXZKBKm/Ekpv/z2tn7qm7U\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 257,
		"path": "../public/assets/briefcase-BknW5TJD.js"
	},
	"/assets/building-complex-C-h6m1a7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1-WQlIweREtbEc3gjGQttd7L1qF7M\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 449,
		"path": "../public/assets/building-complex-C-h6m1a7.js"
	},
	"/assets/check-Czp40LlJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a1-TrDPgaiDWL+Es3CdcPY2P0zIjgg\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 161,
		"path": "../public/assets/check-Czp40LlJ.js"
	},
	"/assets/circle-alert-BK-oUR1U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"138-Zoor0oSE5Gu80ww36MPGUTXWxug\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 312,
		"path": "../public/assets/circle-alert-BK-oUR1U.js"
	},
	"/assets/circle-check-CzD6idck.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7-jF56/SzA6/snbuq+/XjGXDsTJlA\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 247,
		"path": "../public/assets/circle-check-CzD6idck.js"
	},
	"/assets/clock-BxheGP_y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-Df9UafsFO4mDDl4Q9sc8m+q0SlQ\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 206,
		"path": "../public/assets/clock-BxheGP_y.js"
	},
	"/assets/cloud-upload-DGwN3pHO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"139-hlkFPdF/6joBRvhMsrkpxbj1R+A\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 313,
		"path": "../public/assets/cloud-upload-DGwN3pHO.js"
	},
	"/assets/external-link-QZphXmxk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"120-GxBUt7udgy0ooTJ4Rp+5+pggOm4\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 288,
		"path": "../public/assets/external-link-QZphXmxk.js"
	},
	"/assets/file-text-CZQBpvaY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-Fw2czdSMsn9d4NJVaW3Dg/4eR1g\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 422,
		"path": "../public/assets/file-text-CZQBpvaY.js"
	},
	"/assets/flag-LUaHq3Zb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123-V4m11e5CUZisjF68/O1sLlCbA8E\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 291,
		"path": "../public/assets/flag-LUaHq3Zb.js"
	},
	"/assets/index-C1tXH-1H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5aa1f-VSP1idScrcPxRGc2UvHvGAFGkbk\"",
		"mtime": "2026-10-24T19:12:50.212Z",
		"size": 371231,
		"path": "../public/assets/index-C1tXH-1H.js"
	},
	"/assets/info-BWBeJCUU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-xAUgu4D19TF/+cx/JaZOh8CmaVA\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 241,
		"path": "../public/assets/info-BWBeJCUU.js"
	},
	"/assets/insights-22p6v0ex.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-kesSWo72YdRZFp3g6KKRmL55ASQ\"",
		"mtime": "2026-10-24T19:12:50.221Z",
		"size": 48,
		"path": "../public/assets/insights-22p6v0ex.js"
	},
	"/assets/locate-fixed-BFM1HAMD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b8-XT7/UXv+fW/KuHey23tExTMkOt4\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 440,
		"path": "../public/assets/locate-fixed-BFM1HAMD.js"
	},
	"/assets/login-30B4o59o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-avg51zFFsPyh0+Vwqij2yQ5HTfY\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 48,
		"path": "../public/assets/login-30B4o59o.js"
	},
	"/assets/map-pin-CZkD_lg8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"128-7ReHRxgJgg04JQsbdobBCbFwr8U\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 296,
		"path": "../public/assets/map-pin-CZkD_lg8.js"
	},
	"/assets/memory._assetId-BoWkAhu1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-P0hAI2xI64vxsZaoEzIfsOCu39w\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 48,
		"path": "../public/assets/memory._assetId-BoWkAhu1.js"
	},
	"/assets/memory.index-CEiSRa5i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-UnO+f9a4QWpW4DFsrXAP5JcPo9c\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 48,
		"path": "../public/assets/memory.index-CEiSRa5i.js"
	},
	"/assets/missionStore-o4qlvAe8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae3-f4weS1mHag2G6FJoIOADSMgrLFo\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 6883,
		"path": "../public/assets/missionStore-o4qlvAe8.js"
	},
	"/assets/missions._id-DcVa_i-S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-U11oAs45RovGM4R2891NsQSC1/M\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 48,
		"path": "../public/assets/missions._id-DcVa_i-S.js"
	},
	"/assets/memoryStore-DWYT_rPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c51-/NugBcRLcQ+G0sezWgZ2NAcyUy0\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 11345,
		"path": "../public/assets/memoryStore-DWYT_rPL.js"
	},
	"/assets/missions.index-Dri4tmN3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-HkGG5ab63oS8ekdCRrMzCPpLl98\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 48,
		"path": "../public/assets/missions.index-Dri4tmN3.js"
	},
	"/assets/plus-CF3y8vjC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be-O3MQGgBEKStZHB+vUvQOPBaOpOo\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 190,
		"path": "../public/assets/plus-CF3y8vjC.js"
	},
	"/assets/network-Bs6oH-tr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-5VUcIYNuJhLoStWL5ewpf8b9o2c\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 421,
		"path": "../public/assets/network-Bs6oH-tr.js"
	},
	"/assets/proof-BnS7fyxP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"916-BALY7PzBkwtaUo6EvvcjOAGFlKc\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 2326,
		"path": "../public/assets/proof-BnS7fyxP.js"
	},
	"/assets/proofStore-DQ5Zqkmw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aeb-ni2rn65SzDCYfrO+FennjLraZxI\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 2795,
		"path": "../public/assets/proofStore-DQ5Zqkmw.js"
	},
	"/assets/proxy-BAIjrE4b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21817-vSNSk1tplDGxIrUcLiWv8mOfe9M\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 137239,
		"path": "../public/assets/proxy-BAIjrE4b.js"
	},
	"/assets/mockIssues-Mhve31PL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe5-NzD7inbfWjK01w+BojPt+IuqmZo\"",
		"mtime": "2026-10-24T19:12:50.222Z",
		"size": 12261,
		"path": "../public/assets/mockIssues-Mhve31PL.js"
	},
	"/assets/radar-DgDdPRbC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-rBTmc+nw15r5JKfl0tOKbJTq4lo\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 48,
		"path": "../public/assets/radar-DgDdPRbC.js"
	},
	"/assets/radar-B8EYh894.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21b-c8AN4kJYoqOpNvxRBsLGMCqy+Ok\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 539,
		"path": "../public/assets/radar-B8EYh894.js"
	},
	"/assets/refresh-cw-cSjDmpFu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166-yaJ5ZuhfErTaSLJPbBZjIJUim6s\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 358,
		"path": "../public/assets/refresh-cw-cSjDmpFu.js"
	},
	"/assets/repeat-DEyW6itO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-C/WzjeRVlrZZa/3oGln/gkgE0js\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 309,
		"path": "../public/assets/repeat-DEyW6itO.js"
	},
	"/assets/report-BLv22R-O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-bilAq+jEpXMCnqjBqcaAq3hMbng\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 48,
		"path": "../public/assets/report-BLv22R-O.js"
	},
	"/assets/rotate-ccw-clock-BS_E8ttr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-bH3xMAWeFDL4bgwQKgoBRTlKFX0\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 303,
		"path": "../public/assets/rotate-ccw-clock-BS_E8ttr.js"
	},
	"/assets/router-compat-BgHcykt8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db7-9953e7mxhvBY06tbCAMxrS7yeKc\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 3511,
		"path": "../public/assets/router-compat-BgHcykt8.js"
	},
	"/assets/routes-BzUUeBuL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-kUkc/jr9VYkp+fEn+BSuq8Cx6aE\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 48,
		"path": "../public/assets/routes-BzUUeBuL.js"
	},
	"/assets/search-Es_10dXj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3-6J7CiU2yc6i1zlqPuVeY3ag2nVw\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 211,
		"path": "../public/assets/search-Es_10dXj.js"
	},
	"/assets/send-M15vmVsZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"394-jRCXjAx84DDieHQs2Xe60DJa7bY\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 916,
		"path": "../public/assets/send-M15vmVsZ.js"
	},
	"/assets/shield-check-U9HuQIuG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165-m50/HOn1wGzZfNNw2zlWuhyqPng\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 357,
		"path": "../public/assets/shield-check-U9HuQIuG.js"
	},
	"/assets/sparkles-7Nsyovjm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"225-HbGuPZnmD8T+U5/FcEZkiF0Etqo\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 549,
		"path": "../public/assets/sparkles-7Nsyovjm.js"
	},
	"/assets/styles-CZYi44el.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"17dee-nNQwm0R/tq6iedyM2VGEoJjEWtE\"",
		"mtime": "2026-10-24T19:12:50.225Z",
		"size": 97774,
		"path": "../public/assets/styles-CZYi44el.css"
	},
	"/assets/supabaseClient-BGgcQbXv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4774-t/TOwmAKUcA1UOwhWATb45Xnqu4\"",
		"mtime": "2026-10-24T19:12:50.223Z",
		"size": 18292,
		"path": "../public/assets/supabaseClient-BGgcQbXv.js"
	},
	"/assets/surface-BIze4Fl4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"809-pB+qYCcy6MRzOS94xbGNOtyoaX0\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 2057,
		"path": "../public/assets/surface-BIze4Fl4.js"
	},
	"/assets/thumbs-up-B9Q_IcaZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29c-EuuMMVkdba+7pihSBvYVgwuPnI0\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 668,
		"path": "../public/assets/thumbs-up-B9Q_IcaZ.js"
	},
	"/assets/ticket._id-DzZG9zRY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-tWfQirSvnLDc58YN2+kSe3g7Dy8\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 48,
		"path": "../public/assets/ticket._id-DzZG9zRY.js"
	},
	"/assets/time-BIzoVa-5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7ec-suFm6suKPiotDZ+Oahx9srRhJjQ\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 2028,
		"path": "../public/assets/time-BIzoVa-5.js"
	},
	"/assets/trees-DvXwhQg9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-ikH91Edk26AAuJpxBv3NCC/XRns\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 402,
		"path": "../public/assets/trees-DvXwhQg9.js"
	},
	"/assets/triangle-alert-B5zN7lBb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"149-wpOSfYm29caIFW2XHPuO2qu6tHU\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 329,
		"path": "../public/assets/triangle-alert-B5zN7lBb.js"
	},
	"/assets/users-BF9sEEmW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"157-U+hKCmxc96dZXBMUBPU1l4oz+t0\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 343,
		"path": "../public/assets/users-BF9sEEmW.js"
	},
	"/assets/utils-BypgsYmK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e53-rWuDSCdn3tKt/5MUoAD2f5G23Pw\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 11859,
		"path": "../public/assets/utils-BypgsYmK.js"
	},
	"/assets/withTheme-u7Ze5P4j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-jek6zhL550DPS8r8jzq2bldl9SE\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 278,
		"path": "../public/assets/withTheme-u7Ze5P4j.js"
	},
	"/assets/workspaces-D83eGrtY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1224-gvevBprS8MVYiEMfzlxM+5vrWeo\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 4644,
		"path": "../public/assets/workspaces-D83eGrtY.js"
	},
	"/assets/workspaces._id-JYX1-Lep.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-BNtYN1RtyKoPw8r993QpLP5/GiA\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 48,
		"path": "../public/assets/workspaces._id-JYX1-Lep.js"
	},
	"/assets/workspaces.index-H_H8uS-v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-tidzgI+mJZNWVzbNriNooWrC2Gg\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 48,
		"path": "../public/assets/workspaces.index-H_H8uS-v.js"
	},
	"/assets/x-C6dkvVLK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf-m2ef8IK5tabXiQsnw7g6QM2LP8A\"",
		"mtime": "2026-10-24T19:12:50.224Z",
		"size": 191,
		"path": "../public/assets/x-C6dkvVLK.js"
	},
	"/brand/g2k-logo.webp": {
		"type": "image/webp",
		"etag": "\"4d42-1gQU79TH/wqta4DYEpXU4xS4jxs\"",
		"mtime": "2026-10-24T19:12:50.774Z",
		"size": 19778,
		"path": "../public/brand/g2k-logo.webp"
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
