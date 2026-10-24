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
		"mtime": "2026-10-24T19:04:19.807Z",
		"size": 15901,
		"path": "../public/apple-touch-icon.png"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"e5e-UAKAXa9xoxTIYv057d6+YjQuGNo\"",
		"mtime": "2026-10-24T19:04:19.807Z",
		"size": 3678,
		"path": "../public/favicon.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-24T19:04:19.807Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/AdminDashboard-BREvYnN1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae89-jRvEOZcIKPCZD/tLa2yL5uOqfRU\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 44681,
		"path": "../public/assets/AdminDashboard-BREvYnN1.js"
	},
	"/assets/AppShell-Dy8qlj2k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66e3-9AQAFk85c2mA2ljfePUMuHYkHEI\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 26339,
		"path": "../public/assets/AppShell-Dy8qlj2k.js"
	},
	"/assets/AppShell-vh-t_kPv.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"3af7-hJRdDJQQrsTdSxJ69xb7a611WZ4\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 15095,
		"path": "../public/assets/AppShell-vh-t_kPv.css"
	},
	"/assets/AssetMemoryPage-oH3Ofdgo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1988-B1fgk20iWQUyy3W7X54+HJqqWoc\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 6536,
		"path": "../public/assets/AssetMemoryPage-oH3Ofdgo.js"
	},
	"/assets/AuthContext-Z2LvSJZg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"743-etgrL22ObkqEl6AVKJ7OF3l6E/I\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 1859,
		"path": "../public/assets/AuthContext-Z2LvSJZg.js"
	},
	"/assets/Circle-CkpIGBL1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-uNhuLA2pp1nXE8H/asVz8mkE2rc\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 286,
		"path": "../public/assets/Circle-CkpIGBL1.js"
	},
	"/assets/HomePage-TXmikb4s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6693-6aPKm5cM2kF5/+iWAlTGuw6jvy8\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 26259,
		"path": "../public/assets/HomePage-TXmikb4s.js"
	},
	"/assets/InsightsPage-C5Bj0oFY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ead-I3pmtMbsJlChk2Ij68CCVAW/SUY\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 16045,
		"path": "../public/assets/InsightsPage-C5Bj0oFY.js"
	},
	"/assets/LoginPage-BIGn2x6s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5bca-lNrPyYvtcopxrdoYxGNMDuZY4DE\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 23498,
		"path": "../public/assets/LoginPage-BIGn2x6s.js"
	},
	"/assets/MemoryIndexPage-B0PQP_Mq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b79-1AoSSoadOn3r2OVsehomx6GNEO0\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 2937,
		"path": "../public/assets/MemoryIndexPage-B0PQP_Mq.js"
	},
	"/assets/MemoryParts-COwIUq1H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d85-49+NPOkgZ0diuNSv+P6eckXMqTs\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 3461,
		"path": "../public/assets/MemoryParts-COwIUq1H.js"
	},
	"/assets/MissionDetailPage-CSy9DpjK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"313b-is70zFuQtdExng2PLGqtQmKnxjM\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 12603,
		"path": "../public/assets/MissionDetailPage-CSy9DpjK.js"
	},
	"/assets/MissionsPage-CIY2Zh3k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12ff-xpUUvu6VFt1xrTGnfKIu0bXbqUY\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 4863,
		"path": "../public/assets/MissionsPage-CIY2Zh3k.js"
	},
	"/assets/RadarPage-CH3Xv-In.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3931-clY5XBTFfqWE2iz9hdOH2CNdKb8\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 14641,
		"path": "../public/assets/RadarPage-CH3Xv-In.js"
	},
	"/assets/ReportPage-a0HE7Q-5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"608e-Iek99gGn6M2zXjV7/V0xssNgBPA\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 24718,
		"path": "../public/assets/ReportPage-a0HE7Q-5.js"
	},
	"/assets/TicketDetail-C8VCn0WA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a68d-yU9jH4FJdIzzZWoUPRIp1W++SwA\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 42637,
		"path": "../public/assets/TicketDetail-C8VCn0WA.js"
	},
	"/assets/TileLayer-Cc6GwRm1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25305-JKmbL8VOsmRX8Vuac3a3toRPOsw\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 152325,
		"path": "../public/assets/TileLayer-Cc6GwRm1.js"
	},
	"/assets/Tooltip-Cfj3t6iO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34e-qtyuhb5vo72qBcekpdUGFhEQNmk\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 846,
		"path": "../public/assets/Tooltip-Cfj3t6iO.js"
	},
	"/assets/WorkspaceDetailPage-BTKsDpu6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cfdf-ynr4GysXqgugLgw9bx6ewYZ2fRQ\"",
		"mtime": "2026-10-24T19:04:19.082Z",
		"size": 380895,
		"path": "../public/assets/WorkspaceDetailPage-BTKsDpu6.js"
	},
	"/assets/WorkspacesPage-CEi1GLeA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a4-Xb5wyH1byrlon1R5FIV3J1OcK/s\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 4516,
		"path": "../public/assets/WorkspacesPage-CEi1GLeA.js"
	},
	"/assets/admin-DxLTm3lf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-cyq2ysY5as1lmn2nzdKYOQFTxJU\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 48,
		"path": "../public/assets/admin-DxLTm3lf.js"
	},
	"/assets/aiAdvisory-DSsfBUt5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"414-9+4LRGZvrXilRHNNMjijPyJXBQs\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 1044,
		"path": "../public/assets/aiAdvisory-DSsfBUt5.js"
	},
	"/assets/arrow-left-Bt1u_U9j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-TTMoMwLJmJrE9qrt9x/JSBwfl7M\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 202,
		"path": "../public/assets/arrow-left-Bt1u_U9j.js"
	},
	"/assets/arrow-right-C3sJOtK-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca-4PIhui8DxWRZd6mKp5T7YP+mLE4\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 202,
		"path": "../public/assets/arrow-right-C3sJOtK-.js"
	},
	"/assets/award-CbTosQz-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"137-oO9l6Z6n9oQZ03RJwVMgeHbc8HQ\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 311,
		"path": "../public/assets/award-CbTosQz-.js"
	},
	"/assets/bell-DywJlojS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-bx+MFLDQQIQax4InPwluQY1+SyM\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 327,
		"path": "../public/assets/bell-DywJlojS.js"
	},
	"/assets/briefcase-DM2BPSIj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-GUEyMMFAnyIqxgNqRwyq/Fpev/k\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 257,
		"path": "../public/assets/briefcase-DM2BPSIj.js"
	},
	"/assets/building-complex-sck2plNL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1-3rnQadFmAZiA4QBxF1e4FmqefbY\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 449,
		"path": "../public/assets/building-complex-sck2plNL.js"
	},
	"/assets/check-DJoBuKZK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a1-G9HtLUcoBAMwcv2BMJqtNWVzRow\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 161,
		"path": "../public/assets/check-DJoBuKZK.js"
	},
	"/assets/circle-alert-CbSE8YYq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"138-XND96WPBT8rK+3XSd7BFoby8YaA\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 312,
		"path": "../public/assets/circle-alert-CbSE8YYq.js"
	},
	"/assets/circle-check-BmDJWhgR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7-Jnx8s+GgVn1LEsUAl0rP5sbbv8Y\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 247,
		"path": "../public/assets/circle-check-BmDJWhgR.js"
	},
	"/assets/clock-DDUqGPKN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-p7Hwaw6MejXSCHDyIXDHvAbwlKo\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 206,
		"path": "../public/assets/clock-DDUqGPKN.js"
	},
	"/assets/cloud-upload-CilW0FAI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"139-d4Ll/8zRiQQhXrFE2NGLE5PFGzQ\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 313,
		"path": "../public/assets/cloud-upload-CilW0FAI.js"
	},
	"/assets/external-link-CYW8PLAP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"120-tLb1k5cobXr9wGPreP5EZ7z3ydA\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 288,
		"path": "../public/assets/external-link-CYW8PLAP.js"
	},
	"/assets/file-text-C8Ant58u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-5lm5fI6K6ZZ9CWOkCK6lK+2M6Kc\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 422,
		"path": "../public/assets/file-text-C8Ant58u.js"
	},
	"/assets/flag-C-APnAor.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123-oeEW3efugwWCSQsVhtSkMITO77Q\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 291,
		"path": "../public/assets/flag-C-APnAor.js"
	},
	"/assets/index-9afJNziX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5aa1f-rCGn8Lkt2ZxtbEa3s8PxrI38ZK0\"",
		"mtime": "2026-10-24T19:04:19.076Z",
		"size": 371231,
		"path": "../public/assets/index-9afJNziX.js"
	},
	"/assets/info-DLKWSKmm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-cB3Q8Nkaxl8/qfnMZKLjuNhLuSo\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 241,
		"path": "../public/assets/info-DLKWSKmm.js"
	},
	"/assets/insights-B9hZupRs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-7mFBQSeUjDPupW0HA0ev9AnM26c\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 48,
		"path": "../public/assets/insights-B9hZupRs.js"
	},
	"/assets/locate-fixed-Zc-0vBkz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b8-jrafAaSk73ghMb8rTBeGbw2pG18\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 440,
		"path": "../public/assets/locate-fixed-Zc-0vBkz.js"
	},
	"/assets/login-CBn26cM2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-NpiSzA5J1Svr/GxwkmGLTDEJGwE\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 48,
		"path": "../public/assets/login-CBn26cM2.js"
	},
	"/assets/map-pin-B41O1oQ4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"128-zgrFRA2vrm1X3dDkw0/QeHl+7FU\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 296,
		"path": "../public/assets/map-pin-B41O1oQ4.js"
	},
	"/assets/memory._assetId-CpW6W7HX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-z4v2UdBFiOPDRhV/FGzXKxEpfv0\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 48,
		"path": "../public/assets/memory._assetId-CpW6W7HX.js"
	},
	"/assets/memory.index-IjYUG8MK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-FEtkahkcHVu2JQZ5MHxNiVrNbTs\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 48,
		"path": "../public/assets/memory.index-IjYUG8MK.js"
	},
	"/assets/memoryStore-DWYT_rPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c51-/NugBcRLcQ+G0sezWgZ2NAcyUy0\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 11345,
		"path": "../public/assets/memoryStore-DWYT_rPL.js"
	},
	"/assets/missionStore-o4qlvAe8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae3-f4weS1mHag2G6FJoIOADSMgrLFo\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 6883,
		"path": "../public/assets/missionStore-o4qlvAe8.js"
	},
	"/assets/missions._id-C27PK5iO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-K/J8PR7SxS5EYXnq2AYxv7ZgLHo\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 48,
		"path": "../public/assets/missions._id-C27PK5iO.js"
	},
	"/assets/missions.index-BV93DDFP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-sKEuh1kNuB+B8KMJY4kqRqNvYKE\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 48,
		"path": "../public/assets/missions.index-BV93DDFP.js"
	},
	"/assets/mockIssues-Mhve31PL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe5-NzD7inbfWjK01w+BojPt+IuqmZo\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 12261,
		"path": "../public/assets/mockIssues-Mhve31PL.js"
	},
	"/assets/network-B2zUDVjX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a5-oumb6HzXxsffEepXusdHoOqRNHM\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 421,
		"path": "../public/assets/network-B2zUDVjX.js"
	},
	"/assets/plus-CKtKE4H1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be-/QKTiDkDqU+glS0COoYdbgSDIcE\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 190,
		"path": "../public/assets/plus-CKtKE4H1.js"
	},
	"/assets/proof-BnS7fyxP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"916-BALY7PzBkwtaUo6EvvcjOAGFlKc\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 2326,
		"path": "../public/assets/proof-BnS7fyxP.js"
	},
	"/assets/proofStore-DQ5Zqkmw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aeb-ni2rn65SzDCYfrO+FennjLraZxI\"",
		"mtime": "2026-10-24T19:04:19.083Z",
		"size": 2795,
		"path": "../public/assets/proofStore-DQ5Zqkmw.js"
	},
	"/assets/proxy-BsGP-OlJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21817-uLgt0ffKpiK378QRseqPzpuclO4\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 137239,
		"path": "../public/assets/proxy-BsGP-OlJ.js"
	},
	"/assets/radar-D15taPwP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-diqAI8tt6JeCAEZPPqJ3qedKsnA\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 48,
		"path": "../public/assets/radar-D15taPwP.js"
	},
	"/assets/radar-Ce3CHbP-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21b-n9O9qw0hxNkva4aTQG+v+Jtnb/M\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 539,
		"path": "../public/assets/radar-Ce3CHbP-.js"
	},
	"/assets/refresh-cw-S5oTw2sQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166-dapm67sFOtCx7gjoZ93kqc57ggg\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 358,
		"path": "../public/assets/refresh-cw-S5oTw2sQ.js"
	},
	"/assets/repeat-tyUl0FPC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-IDivrM/yXKLRjieT8Mv9Cw/G33g\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 309,
		"path": "../public/assets/repeat-tyUl0FPC.js"
	},
	"/assets/report-DqO7721P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-F4WpnqdxAbCkQtpCqcxiKtoOqxo\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 48,
		"path": "../public/assets/report-DqO7721P.js"
	},
	"/assets/rotate-ccw-clock-UJR8O302.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-7FHvYCDlbrrbR7dZvKtr8+DGoWo\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 303,
		"path": "../public/assets/rotate-ccw-clock-UJR8O302.js"
	},
	"/assets/router-compat-CTuzuX8L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db7-U0WtnMGU0Moa1gAV4SI3IrAb8Z0\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 3511,
		"path": "../public/assets/router-compat-CTuzuX8L.js"
	},
	"/assets/routes-CBMDmep-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-EhnkrF0GHoIL3so7gYn2OgmKCTI\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 48,
		"path": "../public/assets/routes-CBMDmep-.js"
	},
	"/assets/search-RTWMUacZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3-XOx35IC3ac39ftlvGi82xK800/I\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 211,
		"path": "../public/assets/search-RTWMUacZ.js"
	},
	"/assets/send-Bts8VRc3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"394-Yal4xLO1zvBeX7MdZ8IueS5fBKM\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 916,
		"path": "../public/assets/send-Bts8VRc3.js"
	},
	"/assets/shield-check-Cn1C7Usd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"165-nFsYnL/8Is85lXIOHsSrBUW0CZc\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 357,
		"path": "../public/assets/shield-check-Cn1C7Usd.js"
	},
	"/assets/sparkles-ywl8KDI6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"225-HPnCfFRTTozybATNOXJmRGfdw3o\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 549,
		"path": "../public/assets/sparkles-ywl8KDI6.js"
	},
	"/assets/styles-Dvvzjb-W.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"179b7-qz19Biz5rGWAnUnmxcX4NwpS1fM\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 96695,
		"path": "../public/assets/styles-Dvvzjb-W.css"
	},
	"/assets/supabaseClient-BGgcQbXv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4774-t/TOwmAKUcA1UOwhWATb45Xnqu4\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 18292,
		"path": "../public/assets/supabaseClient-BGgcQbXv.js"
	},
	"/assets/surface-BIze4Fl4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"809-pB+qYCcy6MRzOS94xbGNOtyoaX0\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 2057,
		"path": "../public/assets/surface-BIze4Fl4.js"
	},
	"/assets/ticket._id-BaWVeOMH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-x+pmjmMRBOdoYbXD2mqMeKXMT2c\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 48,
		"path": "../public/assets/ticket._id-BaWVeOMH.js"
	},
	"/assets/thumbs-up-D9RUWC6J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29c-ky3NgO2AgN0jqp5vd9KhJErpdM4\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 668,
		"path": "../public/assets/thumbs-up-D9RUWC6J.js"
	},
	"/assets/time-BIzoVa-5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7ec-suFm6suKPiotDZ+Oahx9srRhJjQ\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 2028,
		"path": "../public/assets/time-BIzoVa-5.js"
	},
	"/assets/trees-D0zOFMm1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"192-fe0cAdLz+vtzTDmPlvnfb0yACwI\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 402,
		"path": "../public/assets/trees-D0zOFMm1.js"
	},
	"/assets/users-D_loFivt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"157-rANHNOpajh9wOFr99RIb0+jjaK0\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 343,
		"path": "../public/assets/users-D_loFivt.js"
	},
	"/assets/utils-BypgsYmK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e53-rWuDSCdn3tKt/5MUoAD2f5G23Pw\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 11859,
		"path": "../public/assets/utils-BypgsYmK.js"
	},
	"/assets/withTheme-ByiydKCp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-syic6iyHGUonTW1vi+ZKw1ZY8LE\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 278,
		"path": "../public/assets/withTheme-ByiydKCp.js"
	},
	"/assets/triangle-alert-DPtjAcP4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"149-0H7CLKuyMSKY3vmBBWKkG1nP8lw\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 329,
		"path": "../public/assets/triangle-alert-DPtjAcP4.js"
	},
	"/assets/workspaces-D83eGrtY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1224-gvevBprS8MVYiEMfzlxM+5vrWeo\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 4644,
		"path": "../public/assets/workspaces-D83eGrtY.js"
	},
	"/assets/workspaces._id-SI9BJ34v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-i7XeFGrKfkMeOMIiL6wF94JH1FU\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 48,
		"path": "../public/assets/workspaces._id-SI9BJ34v.js"
	},
	"/assets/workspaces.index-DDf3TC_l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30-lkCbPI6YkQbsA9WV+UxsF3aJljg\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 48,
		"path": "../public/assets/workspaces.index-DDf3TC_l.js"
	},
	"/assets/x-CujjqL5l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf-oP8sKsn7YK0MsrxyI+46nE+ZSUo\"",
		"mtime": "2026-10-24T19:04:19.084Z",
		"size": 191,
		"path": "../public/assets/x-CujjqL5l.js"
	},
	"/brand/g2k-logo.webp": {
		"type": "image/webp",
		"etag": "\"4d42-1gQU79TH/wqta4DYEpXU4xS4jxs\"",
		"mtime": "2026-10-24T19:04:19.806Z",
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
