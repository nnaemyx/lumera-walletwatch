"use client";

import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import QuickActions from "@/components/QuickActions";
import NetworkInfo from "@/components/NetworkInfo";
import Features from "@/components/Features";
import TransferModal from "@/components/TransferModal";
import StakingModal from "@/components/StakingModal";
import HistoryModal from "@/components/HistoryModal";
import AnalyticsModal from "@/components/AnalyticsModal";
import { AlertCircle, Sparkles, Zap, ArrowRight, Shield, TrendingUp, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected, error } = useWallet();
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showStakingModal, setShowStakingModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(248,113,113,0.10),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,113,133,0.08),transparent_50%)] pointer-events-none" />
      {/* Animated mesh gradient */}
      <div className="fixed inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(239,68,68,0.06)_50%,transparent_70%)] pointer-events-none animate-pulse"></div>
      {/* Diagonal lines pattern */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(239,68,68,0.1) 10px, rgba(239,68,68,0.1) 20px)`,
      }}></div>
      
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
            className="max-w-4xl mx-auto"
          >
            {/* HERO SECTION - ECLIPSE DESIGN */}
            <div className="mb-20 mt-6">
              <div className="max-w-6xl mx-auto">
                {/* Vertical Stacked Hero */}
                <div className="text-center mb-16">
                  {/* Large Logo at Top */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="mb-10"
                  >
                    <div className="inline-flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 rounded-full shadow-2xl glow-primary border-4 border-red-400/50 relative">
                      <span className="text-white font-normal text-8xl md:text-9xl tracking-tight" style={{ fontFamily: 'var(--font-bebas)' }}>E</span>
                      {/* Glowing rings */}
                      <div className="absolute inset-0 border-4 border-dashed border-red-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                      <div className="absolute -inset-4 border-2 border-red-500/20 rounded-full"></div>
                    </div>
                  </motion.div>

                  {/* Title and Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-red-300 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: 'var(--font-bebas)' }}>
                        Premium DeFi Platform
                      </span>
                    </div>

                    <h1 
                      className="text-7xl md:text-9xl font-normal text-white mb-6 leading-none tracking-tight"
                      style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
                    >
                      <span className="bg-gradient-to-r from-red-400 via-rose-400 to-pink-400 bg-clip-text text-transparent">
                        ECLIPSE
                      </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10 font-light">
                      The ultimate platform for decentralized finance. Experience seamless staking, governance, and asset management.
                    </p>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-2xl transition-all duration-300 font-bold text-lg shadow-2xl glow-primary uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-bebas)' }}
                    >
                      <AlertCircle size={22} />
                      <span>Connect Wallet</span>
                      <ArrowRight size={20} />
                    </motion.button>
                  </motion.div>

                  {/* Feature Pills */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-4 text-sm"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                      <Zap className="text-red-400" size={16} />
                      <span className="text-red-300 font-medium">Ultra Fast</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full">
                      <Shield className="text-rose-400" size={16} />
                      <span className="text-rose-300 font-medium">Secure</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full">
                      <TrendingUp className="text-pink-400" size={16} />
                      <span className="text-pink-300 font-medium">Profitable</span>
                    </div>
                  </motion.div>
                </div>

                {/* Feature Cards - Horizontal Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid md:grid-cols-4 gap-4 mb-16"
                >
                  {[
                    { icon: Shield, title: "Security", desc: "Enterprise-grade", gradient: "from-red-500 to-red-600" },
                    { icon: TrendingUp, title: "Staking", desc: "Maximize returns", gradient: "from-rose-500 to-rose-600" },
                    { icon: Globe, title: "Governance", desc: "Shape the future", gradient: "from-pink-500 to-pink-600" },
                    { icon: Zap, title: "Speed", desc: "Lightning fast", gradient: "from-red-400 to-rose-500" },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-2xl p-6 border-2 border-red-500/20 hover:border-red-400/40 transition-all duration-300 hover:scale-105 group text-center"
                    >
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg glow-primary group-hover:rotate-12 transition-transform duration-300`}>
                        <feature.icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-bebas)' }}>
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {feature.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Visual Showcase */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="relative"
                >
                  <div className="relative h-[400px] bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-3xl border-2 border-red-500/30 p-12 flex items-center justify-center overflow-hidden">
                    {/* Diagonal stripes */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(239,68,68,0.1) 20px, rgba(239,68,68,0.1) 40px)`,
                      }}></div>
                    </div>
                    
                    {/* Central E logo with effects */}
                    <div className="relative z-10">
                      <motion.div
                        animate={{ 
                          boxShadow: [
                            '0 0 40px rgba(239,68,68,0.5)',
                            '0 0 60px rgba(239,68,68,0.7)',
                            '0 0 40px rgba(239,68,68,0.5)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-56 h-56 bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl glow-primary border-4 border-red-400/50 relative"
                      >
                        <span className="text-white font-normal text-9xl" style={{ fontFamily: 'var(--font-bebas)' }}>E</span>
                        {/* Corner dots */}
                        <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-400 rounded-full animate-pulse"></div>
                        <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-rose-400 rounded-full animate-pulse delay-300"></div>
                        <div className="absolute -top-3 -left-3 w-5 h-5 bg-pink-400 rounded-full animate-pulse delay-500"></div>
                        <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-red-400 rounded-full animate-pulse delay-700"></div>
                      </motion.div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-6 left-6 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-6 right-6 w-2 h-2 bg-rose-400 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-6 left-6 w-4 h-4 bg-pink-400 rounded-full animate-pulse delay-500"></div>
                    <div className="absolute bottom-6 right-6 w-2 h-2 bg-red-400 rounded-full animate-pulse delay-700"></div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* INFO CARDS */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <NetworkInfo />
              <Features />
            </div>

            {/* GETTING STARTED */}
            <div className="bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-3xl p-10 border-2 border-red-500/20 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-normal text-white mb-8 tracking-tight uppercase" style={{ fontFamily: 'var(--font-bebas)' }}>
                  Getting Started
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {["Install Keplr Wallet browser extension","Click 'Connect Keplr' in the header","Cosmos network will be added automatically","Start managing, staking & transacting tokens"].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-start gap-4 group p-4 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 text-white flex items-center justify-center text-base font-bold shadow-lg glow-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" style={{ fontFamily: 'var(--font-bebas)' }}>
                        {i + 1}
                      </span>
                      <span className="leading-relaxed text-base font-normal pt-3 text-gray-300 group-hover:text-white transition-colors">
                        {i === 0 ? (
                          <>
                            Install <a href="https://www.keplr.app/" target="_blank" rel="noopener noreferrer" className="underline text-red-400 font-semibold hover:text-rose-400 transition-colors">Keplr Wallet</a> browser extension
                          </>
                        ) : step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            <BalanceCard />

            <QuickActions
              onTransfer={() => setShowTransferModal(true)}
              onStake={() => setShowStakingModal(true)}
              onHistory={() => setShowHistoryModal(true)}
              onAnalytics={() => setShowAnalyticsModal(true)}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <NetworkInfo />
              <Features />
            </div>
          </motion.div>
        )}
      </main>

      {/* MODALS */}
      <TransferModal isOpen={showTransferModal} onClose={() => setShowTransferModal(false)} />
      <StakingModal isOpen={showStakingModal} onClose={() => setShowStakingModal(false)} />
      <HistoryModal isOpen={showHistoryModal} onClose={() => setShowHistoryModal(false)} />
      <AnalyticsModal isOpen={showAnalyticsModal} onClose={() => setShowAnalyticsModal(false)} />
    </div>
  );
}
