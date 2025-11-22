"use client";

import { useState } from "react";
import StepNav from "../components/StepNav";
import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { ComposableMap, Geographies, Geography } from "@vnedyalk0v/react19-simple-maps";
import { countryStats, CountryPoint } from "@/data/countryStats";
import Toggle from "@/components/Toggle";
import { getWorldAverageSeries } from "@/utils/worldAverage";

// World Atlas topojson
const geoUrl = "https://unpkg.com/world-atlas@2/countries-50m.json";

type TooltipState = {
    name: string;
    enrolment?: number;
};

function getLatestEnrolment(name: string): number | undefined {
    const series = countryStats[name];
    if (!series || series.length === 0) return undefined;
    return series[series.length - 1].enrolment;
}

function getHeatColor(value: number | undefined) {
    if (value === undefined) return "#374151"; // no data
    if (value < 70) return "#b91c1c"; // low
    if (value < 85) return "#eab308"; // medium
    if (value < 95) return "#10b981"; // good
    return "#22d3ee"; // excellent
}

export default function StatsPage() {
    // Default to India – feels natural for your use case

    const worldAverageSeries = getWorldAverageSeries();

    const [compareWorld, setCompareWorld] = useState(false);
    const [selectedName, setSelectedName] = useState<string>("India");
    const [hoverTooltip, setHoverTooltip] = useState<TooltipState | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const selectedSeries: CountryPoint[] =
        countryStats[selectedName] ?? countryStats["India"];
    const hasCountryData = !!countryStats[selectedName];
    const mergedBarData = selectedSeries.map((point) => {
        const worldPoint = worldAverageSeries.find((p) => p.year === point.year);
        return {
            ...point,
            worldEnrolment: worldPoint?.enrolment,
            worldLearningIndex: worldPoint?.learningIndex,
        };
    });
    const mergedLineData = selectedSeries.map((point) => {
        const worldPoint = worldAverageSeries.find((p) => p.year === point.year);
        return {
            ...point,
            worldGDP: worldPoint?.gdpPerCapita,
        };
    });

    return (
        <main className="relative mx-auto max-w-6xl">
            {/* ====== TITLE ====== */}
            <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-semibold"
            >
                Education & Growth – Country Comparison
            </motion.h1>
            <div className="mt-3">
                <Toggle
                    checked={compareWorld}
                    setChecked={setCompareWorld}
                    label="Compare to world average"
                />
            </div>

            <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-3 max-w-2xl text-sm text-slate-300"
            >
                Click on a country to see how school enrolment, learning quality, and
                GDP per person move together over time.
            </motion.p>

            {/* ====== WORLD MAP (TOP) ====== */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6"
            >
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Education Access Around the World
                        </h2>
                        <p className="text-xs text-slate-400">
                            Heat map shows latest primary enrolment rates. Darker = poorer
                            access. Click to focus a country.
                        </p>
                    </div>
                    <div className="text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1">
                            <span className="inline-block h-3 w-3 rounded-sm bg-[#b91c1c]" />{" "}
                            low enrolment
                        </span>{" "}
                        ·{" "}
                        <span className="inline-flex items-center gap-1">
                            <span className="inline-block h-3 w-3 rounded-sm bg-[#eab308]" />{" "}
                            medium
                        </span>{" "}
                        ·{" "}
                        <span className="inline-flex items-center gap-1">
                            <span className="inline-block h-3 w-3 rounded-sm bg-[#10b981]" />{" "}
                            good
                        </span>{" "}
                        ·{" "}
                        <span className="inline-flex items-center gap-1">
                            <span className="inline-block h-3 w-3 rounded-sm bg-[#22d3ee]" />{" "}
                            excellent
                        </span>
                    </div>
                </div>

                <div
                    className="flex justify-center"
                    onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                >
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{ scale: 160 }}
                        width={900}
                        height={430}
                    >
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const name = geo.properties.name;
                                    console.log("name", name);
                                    const latestEnrol = getLatestEnrolment(name);

                                    const isSelected = name === selectedName;

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() =>
                                                setHoverTooltip({ name, enrolment: latestEnrol })
                                            }
                                            onMouseLeave={() => setHoverTooltip(null)}
                                            onClick={() => {

                                                setSelectedName(name);
                                            }}
                                            style={{
                                                default: {
                                                    fill: getHeatColor(latestEnrol),
                                                    stroke: isSelected ? "#f97316" : "#0f172a",
                                                    strokeWidth: isSelected ? 1.1 : 0.4,
                                                    outline: "none",
                                                    transition: "fill 0.25s ease, stroke-width 0.2s",
                                                    cursor: "pointer",
                                                },
                                                hover: {
                                                    fill: "#0d9488",
                                                    stroke: "#f97316",
                                                    strokeWidth: 1,
                                                    outline: "none",
                                                    cursor: "pointer",
                                                },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ComposableMap>
                </div>
            </motion.div>

            {/* Map hover tooltip */}
            {hoverTooltip && (
                <div
                    className="pointer-events-none fixed z-50 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-100 shadow-lg"
                    style={{ top: mousePos.y + 15, left: mousePos.x + 15 }}
                >
                    <p className="font-semibold">{hoverTooltip.name}</p>
                    {hoverTooltip.enrolment !== undefined ? (
                        <p>Primary enrolment: {hoverTooltip.enrolment}%</p>
                    ) : (
                        <p className="text-slate-400">No dataset in this demo</p>
                    )}
                </div>
            )}

            {/* ====== SELECTED COUNTRY SUMMARY ====== */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-6 flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-200 sm:flex-row sm:items-center sm:justify-between"
            >
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Selected country
                    </p>
                    <p className="text-lg font-semibold">
                        {selectedName}{" "}
                        {!hasCountryData && (
                            <span className="ml-2 text-xs font-normal text-amber-400">
                                (no detailed data in demo – showing India as example below)
                            </span>
                        )}
                    </p>
                </div>
                <div className="text-xs text-slate-400">
                    Data points:{" "}
                    <span className="font-medium">
                        {selectedSeries.map((d) => d.year).join(", ")}
                    </span>
                </div>
            </motion.div>

            {/* ====== BAR CHART – ENROLMENT + LEARNING ====== */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
            >
                <h2 className="text-xl font-semibold">
                    School enrolment vs learning (primary)
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                    Enrolment shows how many children are in school. The learning index is
                    a simplified 0–100 measure of learning quality, not an official
                    metric, but it highlights that “being in school” and “actually
                    learning” are not the same thing.
                </p>

                <div className="mt-6 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mergedBarData}>
                            <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" />
                            <XAxis
                                dataKey="year"
                                stroke="#e5e7eb"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                yAxisId="left"
                                stroke="#e5e7eb"
                                domain={[0, 130]}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke="#e5e7eb"
                                domain={[0, 100]}
                                tick={{ fontSize: 12 }}
                            />
                            <RechartsTooltip
                                contentStyle={{
                                    backgroundColor: "#020617",
                                    border: "1px solid #1f2937",
                                    borderRadius: "0.5rem",
                                    fontSize: "0.75rem",
                                }}
                            />
                            <Legend />
                            <Bar
                                yAxisId="left"
                                dataKey="enrolment"
                                name="Enrolment (%)"
                                fill="#10b981"
                                radius={[6, 6, 0, 0]}
                            />
                            {/* <Bar
                                yAxisId="right"
                                dataKey="learningIndex"
                                name="Learning index (0–100)"
                                fill="#38bdf8"
                                radius={[6, 6, 0, 0]}
                            /> */}
                            {compareWorld && (
                                <Bar
                                    yAxisId="left"
                                    dataKey="worldEnrolment"
                                    name="World enrolment avg (%)"
                                    fill="#6366f1"
                                    radius={[6, 6, 0, 0]}
                                />
                            )}
                            {/* {compareWorld && (
                                <Bar
                                    yAxisId="right"
                                    dataKey="worldLearningIndex"
                                    name="World learning avg"
                                    fill="#a855f7"
                                    radius={[6, 6, 0, 0]}
                                />
                            )} */}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* ====== LINE CHART – GDP PER CAPITA ====== */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75 }}
                className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
            >
                <h2 className="text-xl font-semibold">
                    GDP per person vs time – {selectedName}
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                    GDP per capita is a proxy for average income. When more children
                    complete school and actually learn, the workforce becomes more
                    productive, and GDP per person tends to rise over the long term.
                </p>

                <div className="mt-6 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mergedLineData}>
                            <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" />
                            <XAxis
                                dataKey="year"
                                stroke="#e5e7eb"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                stroke="#e5e7eb"
                                tick={{ fontSize: 12 }}
                                tickFormatter={(v) =>
                                    v >= 1000 ? `${Math.round(v / 1000)}k` : v.toString()
                                }
                            />
                            <RechartsTooltip
                                formatter={(value: any) =>
                                    typeof value === "number"
                                        ? `$${value.toLocaleString("en-US")}`
                                        : value
                                }
                                contentStyle={{
                                    backgroundColor: "#020617",
                                    border: "1px solid #1f2937",
                                    borderRadius: "0.5rem",
                                    fontSize: "0.75rem",
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="gdpPerCapita"
                                name="GDP per capita (US$)"
                                stroke="#f97316"
                                strokeWidth={2.2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            {compareWorld && (
                                <Line
                                    type="monotone"
                                    dataKey="worldGDP"
                                    name="World GDP avg (US$)"
                                    stroke="#8b5cf6"
                                    strokeWidth={2}
                                    strokeDasharray="6 4"
                                    dot={{ r: 3 }}
                                    activeDot={{ r: 5 }}
                                />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            <StepNav />
        </main>
    );
}
