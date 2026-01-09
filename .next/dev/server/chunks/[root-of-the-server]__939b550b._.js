module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/rate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
function toYMD(d) {
    return d.toISOString().slice(0, 10);
}
function pickLatestRate(observations) {
    for(let i = observations.length - 1; i >= 0; i--){
        const obs = observations[i];
        const v = obs.FXUSDCAD?.v;
        if (v !== undefined) {
            const numv = Number(v);
            if (!Number.isNaN(numv)) {
                return {
                    ratedate: obs.d,
                    rate: numv
                };
            }
        }
    }
    throw new Error("Could Not Find A Rate !");
// loop from end to start
// find first obs where obs.FXUSDCAD?.v exists AND converts to a number (not NaN)
// return { rate: number, rateDate: string }
// if none found, throw an error
}
async function GET() {
    const end = new Date();
    const start = new Date(end);
    start.setDate(start.getDate() - 10);
    //call Bank of Canada Api to get most current exchange rate
    const startStr = toYMD(start);
    const endStr = toYMD(end);
    const url = `https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?start_date=${startStr}&end_date=${endStr}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("500 JSON Error");
    }
    const data = await res.json();
    const { rate, ratedate } = pickLatestRate(data.observations);
    return Response.json({
        rate,
        rateDate: ratedate
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__939b550b._.js.map