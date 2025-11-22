"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
    { label: "Importance", path: "/importance" },
    { label: "Awareness", path: "/awareness" },
    { label: "Stats", path: "/stats" },
    { label: "Funds", path: "/funds" },
    { label: "Why", path: "/why" },
];

export default function StepNav() {
    const current = usePathname();

    const index = steps.findIndex((s) => s.path === current);
    const next = steps[index + 1];
    const prev = steps[index - 1];

    return (
        <div className="mt-10 flex items-center justify-between border-t border-slate-800 pt-6">
            {prev ? (
                <Link
                    href={prev.path}
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
                >
                    ← {prev.label}
                </Link>
            ) : (
                <div />
            )}

            {next ? (
                <Link
                    href={next.path}
                    className="rounded-lg border border-emerald-500 bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-emerald-400"
                >
                    {next.label} →
                </Link>
            ) : (
                <div />
            )}
        </div>
    );
}
