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
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(52,211,153,0.10),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(110,231,183,0.08),transparent_50%)] pointer-events-none" />
      {/* Animated mesh gradient */}
      <div className="fixed inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(16,185,129,0.06)_50%,transparent_70%)] pointer-events-none animate-pulse"></div>
      {/* Wave pattern overlay */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q25 30 50 50 T100 50' stroke='%2310b981' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px'
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
            {/* HERO SECTION - QUANTUM DESIGN */}
            <div className="mb-20 mt-8">
              <div className="max-w-7xl mx-auto">
                {/* Full-Width Banner Hero */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative mb-16"
                >
                  <div className="relative bg-gradient-to-br from-emerald-600/20 via-teal-600/20 to-green-600/20 rounded-3xl border-2 border-emerald-500/30 p-12 md:p-16 overflow-hidden backdrop-blur-sm">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16,185,129,0.2) 1px, transparent 0)`,
                        backgroundSize: '50px 50px'
                      }}></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-8"
                        >
                          <Sparkles className="text-emerald-400" size={18} />
                          <span className="text-emerald-300 text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: 'var(--font-raleway)' }}>
                            Revolutionary DeFi Experience
                          </span>
                        </motion.div>

                        <motion.h1 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-6xl md:text-8xl font-bold text-white mb-6 leading-[1.1]"
                          style={{ fontFamily: 'var(--font-playfair)' }}
                        >
                          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
                            Quantum
                          </span>
                        </motion.h1>
                        
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto font-light"
                        >
                          Experience the quantum leap in decentralized finance. Manage, stake, and govern with unprecedented speed and security.
                        </motion.p>

                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                          className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl transition-all duration-300 font-bold text-lg shadow-2xl glow-primary"
                            style={{ fontFamily: 'var(--font-raleway)' }}
                          >
                            <AlertCircle size={22} />
                            <span>Connect Your Wallet</span>
                            <ArrowRight size={20} />
                          </motion.button>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <Zap className="text-emerald-400" size={18} />
                              <span>Lightning Fast</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="text-teal-400" size={18} />
                              <span>Bank-Level Security</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
                  </div>
                </motion.div>

                {/* Asymmetric Feature Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                  {[
                    { icon: Shield, title: "Quantum Security", desc: "Military-grade encryption", gradient: "from-emerald-500 to-emerald-600", delay: 0.6 },
                    { icon: TrendingUp, title: "Smart Staking", desc: "Automated yield optimization", gradient: "from-teal-500 to-teal-600", delay: 0.7 },
                    { icon: Globe, title: "Global Governance", desc: "Decentralized decision making", gradient: "from-green-500 to-green-600", delay: 0.8 },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: feature.delay }}
                      className={`bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-2xl p-8 border-2 border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105 group ${i === 1 ? 'md:mt-8' : ''}`}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl glow-primary group-hover:rotate-6 transition-transform duration-300`}>
                        <feature.icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Central Visual Element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="relative max-w-3xl mx-auto"
                >
                  <div className="relative h-[450px] bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-3xl border-2 border-emerald-500/30 p-16 flex items-center justify-center overflow-hidden">
                    {/* Hexagonal pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(16,185,129,0.1) 2px, rgba(16,185,129,0.1) 4px),
                          repeating-linear-gradient(60deg, transparent, transparent 2px, rgba(16,185,129,0.1) 2px, rgba(16,185,129,0.1) 4px),
                          repeating-linear-gradient(120deg, transparent, transparent 2px, rgba(16,185,129,0.1) 2px, rgba(16,185,129,0.1) 4px)`,
                      }}></div>
                    </div>
                    
                    {/* Central Q logo */}
                    <div className="relative z-10">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="w-64 h-64 border-4 border-dashed border-emerald-500/40 rounded-full flex items-center justify-center"
                      >
                        <div className="w-48 h-48 bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600 rounded-full flex items-center justify-center shadow-2xl glow-primary border-4 border-emerald-400/50">
                          <span className="text-white font-bold text-8xl" style={{ fontFamily: 'var(--font-playfair)' }}>Q</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Orbiting particles */}
                    <div className="absolute top-20 left-20 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-32 right-24 w-3 h-3 bg-teal-400 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute bottom-32 left-24 w-5 h-5 bg-green-400 rounded-full animate-pulse delay-500"></div>
                    <div className="absolute bottom-20 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-pulse delay-700"></div>
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
            <div className="bg-gradient-to-br from-[#111118] to-[#0f0f15] rounded-3xl p-10 border-2 border-emerald-500/20 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
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
                      <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center text-base font-bold shadow-lg glow-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" style={{ fontFamily: 'var(--font-raleway)' }}>
                        {i + 1}
                      </span>
                      <span className="leading-relaxed text-base font-normal pt-3 text-gray-300 group-hover:text-white transition-colors">
                        {i === 0 ? (
                          <>
                            Install <a href="https://www.keplr.app/" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 font-semibold hover:text-teal-400 transition-colors">Keplr Wallet</a> browser extension
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
