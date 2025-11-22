"use client";
import { Dispatch, SetStateAction } from "react";

export default function Toggle({
    checked,
    setChecked,
    label,
}: {
    checked: boolean;
    setChecked: Dispatch<SetStateAction<boolean>>;
    label: string;
}) {
    return (
        <label className="flex cursor-pointer items-center gap-3 select-none">
            <span className="text-sm text-slate-300">{label}</span>
            <div
                className={`h-5 w-9 rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-slate-700"
                    }`}
                onClick={() => setChecked((prev) => !prev)}
            >
                <div
                    className={`h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : "translate-x-0"
                        }`}
                />
            </div>
        </label>
    );
}
