"use client";

import { motion } from "framer-motion";
import StepNav from "../components/StepNav";

export default function ImportancePage() {
    return (
        <main className="max-w-4xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-semibold"
            >
                Do you believe education is important?
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 text-slate-300 max-w-2xl"
            >
                Be honest — what you answer influences what we show you next.
            </motion.p>

            <div className="mt-8 flex gap-4">
                <button className="rounded-xl bg-emerald-500 px-5 py-3 text-slate-900 font-medium hover:bg-emerald-400">
                    Yes, absolutely
                </button>
                <button className="rounded-xl border border-slate-600 px-5 py-3 hover:bg-slate-800">
                    Not really
                </button>
            </div>

            <StepNav />
        </main>
    );
}
