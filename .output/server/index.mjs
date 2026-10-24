globalThis.__nitro_main__ = import.meta.url;
import { H3Core, HTTPError, NodeResponse, composeMiddleware, createMatcherFromFind, defineHandler, defineLazyEventHandler, headers, memoizeRouteRulesMatcher, serve, toEventHandler } from "./_libs/h3+rou3+srvx.mjs";
import { HookableCore } from "./_libs/hookable.mjs";
import { decodePath, joinURL, withLeadingSlash, withoutTrailingSlash } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
// #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"2532-P1u486agW3ymimJYHS3VvIiBLK8\"",
		"mtime": "2026-10-24T18:35:53.859Z",
		"size": 9522,
		"path": "../public/favicon.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-24T18:35:53.859Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AdminDashboard-BZEYGzUy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae89-7hOcOlL4477R9kssxJasx0qlYsw\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 44681,
		"path": "../public/assets/AdminDashboard-BZEYGzUy.js"
	},
	"/assets/AppShell-BT69svap.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6600-GXHbyO01T5IfxWCvulw1L+VMNyA\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 26112,
		"path": "../public/assets/AppShell-BT69svap.js"
	},
	"/assets/AppShell-vh-t_kPv.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"3af7-hJRdDJQQrsTdSxJ69xb7a611WZ4\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 15095,
		"path": "../public/assets/AppShell-vh-t_kPv.css"
	},
	"/assets/AssetMemoryPage-D6dIZxgs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1988-dVE6/42xhq4Cj/dGeztfsJGsMlI\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 6536,
		"path": "../public/assets/AssetMemoryPage-D6dIZxgs.js"
	},
	"/assets/AuthContext-DXEM4PN6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"743-YP3TwsH0qlW8WEjOtPNjJSKr8U4\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 1859,
		"path": "../public/assets/AuthContext-DXEM4PN6.js"
	},
	"/assets/Circle-CKbr7jnT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-g2LeaaUdkvsbo76rnjrK4mhLYZc\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 286,
		"path": "../public/assets/Circle-CKbr7jnT.js"
	},
	"/assets/HomePage-DEViecw-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6693-+li62eTx9epFYQ4HCPBapzGRGXU\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 26259,
		"path": "../public/assets/HomePage-DEViecw-.js"
	},
	"/assets/InsightsPage-AlQ6AcIx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ead-5VnwotdnTd8RvmQhrrF6+Fjz5ds\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 16045,
		"path": "../public/assets/InsightsPage-AlQ6AcIx.js"
	},
	"/assets/LoginPage-BSkTe2Xa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5bca-gGUqSgdXX1ZJ0Uy97B/EmW2ILsc\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 23498,
		"path": "../public/assets/LoginPage-BSkTe2Xa.js"
	},
	"/assets/MemoryIndexPage-CphqL5cc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b79-ORymizpiEiqw0JmNwLXvpUiuf54\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 2937,
		"path": "../public/assets/MemoryIndexPage-CphqL5cc.js"
	},
	"/assets/MemoryParts-GfrUkV_S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d85-cYqX5SzCztE69srw4yDU+XWTiWc\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 3461,
		"path": "../public/assets/MemoryParts-GfrUkV_S.js"
	},
	"/assets/MissionDetailPage-4TXyEs2R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"313b-XgMnDU3vrEN7Aog91qOluWnWRdI\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 12603,
		"path": "../public/assets/MissionDetailPage-4TXyEs2R.js"
	},
	"/assets/MissionsPage-r6LJvdgk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12ff-Co2v4UA7owdn6hn7MFt3s7DPUEQ\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 4863,
		"path": "../public/assets/MissionsPage-r6LJvdgk.js"
	},
	"/assets/RadarPage-Cvcd-np3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3931-9oqW1tq6cCtT80fWZTtWs4sTigY\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 14641,
		"path": "../public/assets/RadarPage-Cvcd-np3.js"
	},
	"/assets/ReportPage-DVkDgKwO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"608e-R+ZwpIPAVmXSVtkBMibUwKoKGZs\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 24718,
		"path": "../public/assets/ReportPage-DVkDgKwO.js"
	},
	"/assets/TicketDetail-D2XRkLNK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a68d-bGjACrnKPwui11ltosQ02zg529U\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 42637,
		"path": "../public/assets/TicketDetail-D2XRkLNK.js"
	},
	"/assets/TileLayer-2Rzpj14X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25305-rM3peGR7kVGCMFpsXWeDowYTy7M\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 152325,
		"path": "../public/assets/TileLayer-2Rzpj14X.js"
	},
	"/assets/Tooltip-BXu58TDC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34e-384wssANGdpaj1KLAzTJbjiH1c8\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 846,
		"path": "../public/assets/Tooltip-BXu58TDC.js"
	},
	"/assets/WorkspaceDetailPage-Dbu2blLi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cfdf-M/tGeZD37XD0g/ILqcGDiI7+akw\"",
		"mtime": "2026-10-24T18:35:53.360Z",
		"size": 380895,
		"path": "../public/assets/WorkspaceDetailPage-Dbu2blLi.js"
	},
	"/assets/WorkspacesPage-DTJ8YSeZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a4-Pp7AkhvPlzqEOKVIJATQdUuyxzU\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 4516,
		"path": "../public/assets/WorkspacesPage-DTJ8YSeZ.js"
	},
	"/assets/admin-BpXcY-Nd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-EhApe2peTifolCPVuIWD44umQdo\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 48,
		"path": "../public/assets/admin-BpXcY-Nd.js"
	},
	"/assets/aiAdvisory-DSsfBUt5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"414-9+4LRGZvrXilRHNNMjijPyJXBQs\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 1044,
		"path": "../public/assets/aiAdvisory-DSsfBUt5.js"
	},
	"/assets/arrow-left-Do8IdGDJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-9n0iQ+iUlooPJRtF8tNIQ7m43/I\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 202,
		"path": "../public/assets/arrow-left-Do8IdGDJ.js"
	},
	"/assets/bell-6RZkCRqi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-hb9mzm0cffpKUu+fBlr9eQarcaY\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 327,
		"path": "../public/assets/bell-6RZkCRqi.js"
	},
	"/assets/arrow-right-D5fzAMqB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-T8Sa1wpT96C3/pyWw6cH63Y19Mk\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 202,
		"path": "../public/assets/arrow-right-D5fzAMqB.js"
	},
	"/assets/award-DVmP_Ni5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"137-rnGlD2NtQ0aNHRxNwXRb6zuviuk\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 311,
		"path": "../public/assets/award-DVmP_Ni5.js"
	},
	"/assets/building-complex-r_JejFsp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1-JZ7NA0c1LpsEpGY8UH/1YQ5IqdU\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 449,
		"path": "../public/assets/building-complex-r_JejFsp.js"
	},
	"/assets/briefcase-CxlvbeV2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-vuk6S+M9lgE/ZlEJzSIRbUr+tpU\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 257,
		"path": "../public/assets/briefcase-CxlvbeV2.js"
	},
	"/assets/check-DzkGNARM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a1-H3CKWmLrCgaA5FUFAtO1aUS24yc\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 161,
		"path": "../public/assets/check-DzkGNARM.js"
	},
	"/assets/circle-alert-DecRq5rS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"138-BLM6kY863o7P6h1svmf2gXnAAIE\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 312,
		"path": "../public/assets/circle-alert-DecRq5rS.js"
	},
	"/assets/circle-check-BrlrcQtN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7-uM4GVNs78yZzIfkn87XCPNt8EcA\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 247,
		"path": "../public/assets/circle-check-BrlrcQtN.js"
	},
	"/assets/clock-lgsYHqSK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-X+4SRG4GQVUorrF41UZnqLBJ5iQ\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 206,
		"path": "../public/assets/clock-lgsYHqSK.js"
	},
	"/assets/cloud-upload-D4E4st5f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"139-te2gGS55bhYEqnkTV82MIKWUT/0\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 313,
		"path": "../public/assets/cloud-upload-D4E4st5f.js"
	},
	"/assets/external-link-ffuz2dJp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"120-JjJpS1xFYeAVUXAtYgyoVT+i8Tk\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 288,
		"path": "../public/assets/external-link-ffuz2dJp.js"
	},
	"/assets/file-text-CISFWSNw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-bP3NhhGYUSxh1IQVfa0YSFpV7Sw\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 422,
		"path": "../public/assets/file-text-CISFWSNw.js"
	},
	"/assets/flag-BQmpSGbk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123-6dmYsOOdUbt2oB1AsPrXBrI99OE\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 291,
		"path": "../public/assets/flag-BQmpSGbk.js"
	},
	"/assets/info-Bt8dJ83m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-s2HzALoDfZ4gDTcKpkYE0OuIchQ\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 241,
		"path": "../public/assets/info-Bt8dJ83m.js"
	},
	"/assets/insights-2zPbe4Nn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-psdLU9gNVznv1YAEAgRs2hG5IU0\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 48,
		"path": "../public/assets/insights-2zPbe4Nn.js"
	},
	"/assets/index-HPCpsI9k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a9df-Pwupkm43lkn3ll/SuNbOBWZn2xE\"",
		"mtime": "2026-10-24T18:35:53.357Z",
		"size": 371167,
		"path": "../public/assets/index-HPCpsI9k.js"
	},
	"/assets/login-BWQ7BUAu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-MtPHVpIb0wmQ/lQu0Y78hQLu6A8\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 48,
		"path": "../public/assets/login-BWQ7BUAu.js"
	},
	"/assets/map-pin-Dh8P84Rx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"128-GLSlF15elzRGJwsDDUPYIHy40O4\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 296,
		"path": "../public/assets/map-pin-Dh8P84Rx.js"
	},
	"/assets/memory._assetId-LcBc1-SI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-NW3hGswyn/8WzoBxmkM0AOfzskQ\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 48,
		"path": "../public/assets/memory._assetId-LcBc1-SI.js"
	},
	"/assets/memory.index-Bt5knVQT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-OvpqWlnUiIhTmnRNgKCJywrnRG8\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 48,
		"path": "../public/assets/memory.index-Bt5knVQT.js"
	},
	"/assets/locate-fixed-zbFvNG8a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b8-zTT9kNXNKhyZtLIf8KovaCWxqFM\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 440,
		"path": "../public/assets/locate-fixed-zbFvNG8a.js"
	},
	"/assets/memoryStore-DWYT_rPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c51-/NugBcRLcQ+G0sezWgZ2NAcyUy0\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 11345,
		"path": "../public/assets/memoryStore-DWYT_rPL.js"
	},
	"/assets/missionStore-o4qlvAe8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae3-f4weS1mHag2G6FJoIOADSMgrLFo\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 6883,
		"path": "../public/assets/missionStore-o4qlvAe8.js"
	},
	"/assets/missions._id-BeVMRSYy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-QzRoZenMkQc8ZjWH/yFLLJCffBc\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 48,
		"path": "../public/assets/missions._id-BeVMRSYy.js"
	},
	"/assets/missions.index-DbgwiKF4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-wjUj+1fvlpDGBsKKZ0A+cfv+N7I\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 48,
		"path": "../public/assets/missions.index-DbgwiKF4.js"
	},
	"/assets/mockIssues-Mhve31PL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe5-NzD7inbfWjK01w+BojPt+IuqmZo\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 12261,
		"path": "../public/assets/mockIssues-Mhve31PL.js"
	},
	"/assets/network-DYn1UTne.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-tFHbR1qH/tJsnl25o2EFAlR/zIE\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 421,
		"path": "../public/assets/network-DYn1UTne.js"
	},
	"/assets/proof-BnS7fyxP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"916-BALY7PzBkwtaUo6EvvcjOAGFlKc\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 2326,
		"path": "../public/assets/proof-BnS7fyxP.js"
	},
	"/assets/plus-DsBR7_H7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be-5HIlMjaJL46T2Stvvg79zXpJ+TU\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 190,
		"path": "../public/assets/plus-DsBR7_H7.js"
	},
	"/assets/proofStore-DQ5Zqkmw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aeb-ni2rn65SzDCYfrO+FennjLraZxI\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 2795,
		"path": "../public/assets/proofStore-DQ5Zqkmw.js"
	},
	"/assets/radar-CCw08gvs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-xJGcDCLBe+GucdTZDdjQGpEFFI8\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 48,
		"path": "../public/assets/radar-CCw08gvs.js"
	},
	"/assets/radar-EvlH6PQ5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21b-1V8mAmU9w3tvp4/Q11WFKzD9PCI\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 539,
		"path": "../public/assets/radar-EvlH6PQ5.js"
	},
	"/assets/proxy-Bo0t1-rf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21817-+cxzVVffTCK7T5VnzWcqVrWaMBI\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 137239,
		"path": "../public/assets/proxy-Bo0t1-rf.js"
	},
	"/assets/refresh-cw-Dh0stmAC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166-WW2mokNDAfmt4kD/XuysJlwRW1o\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 358,
		"path": "../public/assets/refresh-cw-Dh0stmAC.js"
	},
	"/assets/repeat-e6CFcIDP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-1yQySV2bkJImrX2k1c+KLln/3Ts\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 309,
		"path": "../public/assets/repeat-e6CFcIDP.js"
	},
	"/assets/rotate-ccw-clock-DdfQyuXe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-jjOZ64xGv2EQzF5f5oMTdsPvujg\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 303,
		"path": "../public/assets/rotate-ccw-clock-DdfQyuXe.js"
	},
	"/assets/router-compat-C9hswbgb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db7-WTmsTp3fwmvswGcOwuMtJJSXU84\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 3511,
		"path": "../public/assets/router-compat-C9hswbgb.js"
	},
	"/assets/routes-CmvjWkof.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-6k35qs8EQT3b9AfL6iJGi7BPvNI\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 48,
		"path": "../public/assets/routes-CmvjWkof.js"
	},
	"/assets/search-C-cNovAQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3-mgoIU2axdbXuZc7TF9pLcpWS3Zk\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 211,
		"path": "../public/assets/search-C-cNovAQ.js"
	},
	"/assets/send-EZ4KCUV-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"394-fcyviJLoZJFYNen/tOUg6awxxH8\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 916,
		"path": "../public/assets/send-EZ4KCUV-.js"
	},
	"/assets/report-DieNRm9S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-hvq3Bzyp6Sd+3FogfdXRyvUj714\"",
		"mtime": "2026-10-24T18:35:53.361Z",
		"size": 48,
		"path": "../public/assets/report-DieNRm9S.js"
	},
	"/assets/shield-check-DnBQn6fb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165-QNigozmIE5PrqRhJHPH4wJaqfkE\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 357,
		"path": "../public/assets/shield-check-DnBQn6fb.js"
	},
	"/assets/sparkles-Cck4m8Mp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"225-94EaV6ZWSiW0YLQ5oH2b1drzWTw\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 549,
		"path": "../public/assets/sparkles-Cck4m8Mp.js"
	},
	"/assets/styles-BenndjdW.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"17979-LaNjV0SCWlLZU/aMzsp03/WwYOI\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 96633,
		"path": "../public/assets/styles-BenndjdW.css"
	},
	"/assets/supabaseClient-BGgcQbXv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4774-t/TOwmAKUcA1UOwhWATb45Xnqu4\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 18292,
		"path": "../public/assets/supabaseClient-BGgcQbXv.js"
	},
	"/assets/surface-BIze4Fl4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"809-pB+qYCcy6MRzOS94xbGNOtyoaX0\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 2057,
		"path": "../public/assets/surface-BIze4Fl4.js"
	},
	"/assets/thumbs-up-Dt7VtWQ9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29c-/zjVZS1982vQGkqsg10Dpi6v9qE\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 668,
		"path": "../public/assets/thumbs-up-Dt7VtWQ9.js"
	},
	"/assets/ticket._id-qj2l--LW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-qoK9GrhsnlEPrY2KYxgz3OEA9lg\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 48,
		"path": "../public/assets/ticket._id-qj2l--LW.js"
	},
	"/assets/time-BIzoVa-5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7ec-suFm6suKPiotDZ+Oahx9srRhJjQ\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 2028,
		"path": "../public/assets/time-BIzoVa-5.js"
	},
	"/assets/trees-Bn1ckWpQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-83iJwNc5uCEzvYnF002J7ZQwcSc\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 402,
		"path": "../public/assets/trees-Bn1ckWpQ.js"
	},
	"/assets/triangle-alert-BA7Kc78I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"149-B4rZP8AoH/j52SPzC/ZWUj5IZ0U\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 329,
		"path": "../public/assets/triangle-alert-BA7Kc78I.js"
	},
	"/assets/users-BR4RidRx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"157-osPuLYRyBehsBVA9LfjQRiIN/Ek\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 343,
		"path": "../public/assets/users-BR4RidRx.js"
	},
	"/assets/withTheme-Bi0hYdf9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-/rSg516OD5xE7rLc9J8iFhWDrk4\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 278,
		"path": "../public/assets/withTheme-Bi0hYdf9.js"
	},
	"/assets/workspaces-D83eGrtY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1224-gvevBprS8MVYiEMfzlxM+5vrWeo\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 4644,
		"path": "../public/assets/workspaces-D83eGrtY.js"
	},
	"/assets/workspaces._id-CdtosTHS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-T9fXM6tXng6BlH4n5uxqzugm+wU\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 48,
		"path": "../public/assets/workspaces._id-CdtosTHS.js"
	},
	"/assets/workspaces.index-2c1cFTEX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-Ef1Ezc+sHt6HuAMKMV61gLwh9kc\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 48,
		"path": "../public/assets/workspaces.index-2c1cFTEX.js"
	},
	"/assets/x-DO7NABtB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf-Rq0MQU67mhOq1EHksHV3QIbPEB0\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 191,
		"path": "../public/assets/x-DO7NABtB.js"
	},
	"/assets/utils-BypgsYmK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e53-rWuDSCdn3tKt/5MUoAD2f5G23Pw\"",
		"mtime": "2026-10-24T18:35:53.362Z",
		"size": 11859,
		"path": "../public/assets/utils-BypgsYmK.js"
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
