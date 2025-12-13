"use client";

import { useWallet } from "@/contexts/WalletContext";
import { formatTokenAmount } from "@/lib/cosmos-client";
import { Coins, Wallet, RefreshCw, TrendingUp, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PortfolioDashboard() {
  const { 
    address, 
    allBalances, 
    transactionCount, 
    refreshBalance, 
    refreshTransactionCount,
    isConnected 
  } = useWallet();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      refreshTransactionCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refreshBalance(), refreshTransactionCount()]);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const formatDenom = (denom: string) => {
    if (denom === "ulume") return "LUME";
    // Remove 'u' prefix and uppercase
    if (denom.startsWith("u")) {
      return denom.slice(1).toUpperCase();
    }
    return denom.toUpperCase();
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 12)}...${addr.slice(-8)}`;
  };

  const totalValue = allBalances.reduce((sum, balance) => {
    const amount = parseFloat(formatTokenAmount(balance.amount, 6));
    return sum + amount;
  }, 0);

  if (!isConnected) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-3xl p-8 border-2 border-blue-500/20 shadow-2xl backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl glow-primary border-2 border-blue-400/40">
                <Wallet className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-titillium)' }}>
                  Wallet Portfolio Dashboard
                </h2>
                <p className="text-sm text-gray-400 font-mono">
                  {address ? formatAddress(address) : "Not connected"}
                </p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-3 hover:bg-white/10 rounded-xl transition-all duration-200 disabled:opacity-50 hover:scale-110 active:scale-95 backdrop-blur-md border-2 border-blue-400/30 shadow-lg"
              title="Refresh portfolio data"
            >
              <RefreshCw
                size={20}
                className={isRefreshing ? "animate-spin text-blue-400" : "text-blue-400"}
              />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-6 border-2 border-blue-400/30 backdrop-blur-md hover:border-blue-400/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                  <Coins className="text-blue-400" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Total Tokens</p>
                  <p className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-titillium)' }}>
                    {allBalances.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Different token types</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 rounded-2xl p-6 border-2 border-cyan-400/30 backdrop-blur-md hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center border border-cyan-400/30">
                  <TrendingUp className="text-cyan-400" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Total Value</p>
                  <p className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-titillium)' }}>
                    {totalValue.toFixed(6)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Combined balance</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 rounded-2xl p-6 border-2 border-teal-400/30 backdrop-blur-md hover:border-teal-400/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center border border-teal-400/30">
                  <Activity className="text-teal-400" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Transaction Count</p>
                  <p className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-titillium)' }}>
                    {transactionCount}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Total transactions</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Tokens List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-3xl p-8 border-2 border-blue-500/20 shadow-2xl backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-titillium)' }}>
                Token Balances
              </h3>
              <p className="text-sm text-gray-400">View all tokens in your wallet</p>
            </div>
            <span className="text-sm text-gray-300 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-400/30 font-semibold">
              {allBalances.length} {allBalances.length === 1 ? 'Token' : 'Tokens'}
            </span>
          </div>

          {allBalances.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-gray-700/50">
                <Coins className="text-gray-500" size={36} />
              </div>
              <p className="text-gray-400 text-lg font-semibold mb-2">No tokens found</p>
              <p className="text-gray-500 text-sm">Your wallet doesn't have any tokens yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {allBalances.map((balance, index) => {
                const formattedAmount = formatTokenAmount(balance.amount, 6);
                const denom = formatDenom(balance.denom);
                
                return (
                  <motion.div
                    key={`${balance.denom}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl p-6 border-2 border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg glow-primary border-2 border-blue-400/40 group-hover:rotate-12 transition-transform duration-300">
                          <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-titillium)' }}>
                            {denom.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'var(--font-titillium)' }}>
                            {denom}
                          </h4>
                          <p className="text-xs text-gray-400 font-mono">{balance.denom}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-titillium)' }}>
                          {formattedAmount}
                        </p>
                        <p className="text-xs text-gray-400">Balance</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
