"use client";

import { useWallet } from "@/contexts/WalletContext";
import { formatTokenAmount } from "@/lib/cosmos-client";
import { Coins, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function BalanceCard() {
  const { balance, refreshBalance, isConnected } = useWallet();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshBalance();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const formattedBalance = formatTokenAmount(balance);

  return (
    <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-500/30 border border-emerald-400/20">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
            <Coins size={28} />
          </div>
          <div>
            <p className="text-white/90 text-sm font-semibold uppercase tracking-wider mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold mt-1 tracking-tight">
              {isConnected ? formattedBalance : "0.000000"}
            </h2>
          </div>
        </div>
        {isConnected && (
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-3 hover:bg-white/25 rounded-xl transition-all duration-200 disabled:opacity-50 hover:scale-110 active:scale-95 backdrop-blur-sm border border-white/20"
          >
            <RefreshCw
              size={22}
              className={isRefreshing ? "animate-spin" : ""}
            />
          </button>
        )}
      </div>
      <div className="flex items-center justify-between pt-5 border-t border-white/30">
        <span className="text-white/90 text-sm font-semibold uppercase tracking-wider">LUME</span>
        <span className="text-xs bg-white/25 backdrop-blur-sm px-4 py-1.5 rounded-full font-semibold border border-white/30">
          Lumera Mainnet
        </span>
      </div>
    </div>
  );
}

