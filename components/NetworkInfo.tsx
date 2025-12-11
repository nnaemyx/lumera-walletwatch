"use client";

import { Activity, Zap, Shield } from "lucide-react";

export default function NetworkInfo() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">
        Network Status
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
              <Activity className="text-emerald-600 dark:text-emerald-400" size={22} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Network
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Lumera Mainnet
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
            Active
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center border border-cyan-200 dark:border-cyan-800">
              <Zap className="text-cyan-600 dark:text-cyan-400" size={22} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Chain ID
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                lumera-mainnet-1
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center border border-teal-200 dark:border-teal-800">
              <Shield className="text-teal-600 dark:text-teal-400" size={22} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Consensus
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                CometBFT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

