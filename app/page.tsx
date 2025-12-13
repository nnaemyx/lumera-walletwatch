"use client";

import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import { AlertCircle, Wallet, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected, error, connect, isLoading } = useWallet();

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(96,165,250,0.10),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.08),transparent_50%)] pointer-events-none" />
      {/* Animated mesh gradient */}
      <div className="fixed inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(59,130,246,0.06)_50%,transparent_70%)] pointer-events-none animate-pulse"></div>
      
      <Header />

      <main className="container mx-auto px-4 py-10 relative z-10">
        {/* ERROR ALERT */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-950/50 border-2 border-red-500/30 rounded-2xl flex items-start gap-3 shadow-lg backdrop-blur-sm"
          >
            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={22} />
            <div>
              <p className="font-semibold text-red-300">Connection Error</p>
              <p className="text-sm text-red-400/80 mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mt-20"
          >
            {/* Wallet Portfolio Dashboard Landing */}
            <div className="bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-3xl p-12 border-2 border-blue-500/30 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 text-center space-y-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-500/10 border-2 border-blue-500/30 rounded-2xl">
                  <Wallet className="text-blue-400" size={24} />
                  <span className="text-blue-300 text-sm font-semibold tracking-wider" style={{ fontFamily: 'var(--font-titillium)' }}>
                    Lumera Testnet Portfolio
                  </span>
                </div>

                <div>
                  <h1 
                    className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
                    style={{ fontFamily: 'var(--font-titillium)' }}
                  >
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                      Wallet Portfolio Dashboard
                    </span>
                  </h1>
                  
                  <p className="text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
                    Connect your wallet to view your tokens, balances, and transaction history on the Lumera Testnet ecosystem.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center gap-6"
                >
                  <motion.button
                    onClick={connect}
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl transition-all duration-300 font-semibold text-base shadow-2xl glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'var(--font-titillium)' }}
                  >
                    <Wallet size={20} />
                    <span>{isLoading ? "Connecting..." : "Connect Wallet"}</span>
                    <ArrowRight size={18} />
                  </motion.button>
                  
                  <div className="grid grid-cols-3 gap-4 w-full max-w-md mt-4">
                    {[
                      { label: "Tokens", desc: "View all your tokens" },
                      { label: "Balances", desc: "Check your balances" },
                      { label: "Transactions", desc: "See transaction count" },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-center"
                      >
                        <p className="text-sm font-semibold text-blue-300 mb-1">{feature.label}</p>
                        <p className="text-xs text-gray-400">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="mt-8 pt-8 border-t border-blue-500/20">
                  <p className="text-sm text-gray-400 mb-4">Getting Started:</p>
                  <div className="flex flex-col gap-3 text-left max-w-md mx-auto">
                    {[
                      "Install Keplr Wallet browser extension",
                      "Click 'Connect Wallet' button above",
                      "Lumera Testnet will be added automatically",
                      "View your portfolio dashboard"
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm text-gray-300 leading-relaxed">
                          {i === 0 ? (
                            <>
                              Install <a href="https://www.keplr.app/" target="_blank" rel="noopener noreferrer" className="underline text-blue-400 font-semibold hover:text-cyan-400 transition-colors">Keplr Wallet</a> browser extension
                            </>
                          ) : step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto"
          >
            <PortfolioDashboard />
          </motion.div>
        )}
      </main>
    </div>
  );
}
