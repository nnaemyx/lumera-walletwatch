"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { X, TrendingUp, Percent, Coins, Award, Clock } from "lucide-react";
import { getDelegations, formatTokenAmount } from "@/lib/cosmos-client";

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnalyticsModal({ isOpen, onClose }: AnalyticsModalProps) {
  const { address, balance } = useWallet();
  const [totalStaked, setTotalStaked] = useState("0");
  const [totalRewards, setTotalRewards] = useState("0");
  const [delegationCount, setDelegationCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && address) {
      loadStakingData();
    }
  }, [isOpen, address]);

  const loadStakingData = async () => {
    if (!address) return;
    
    setIsLoading(true);
    try {
      const delegations = await getDelegations(address);
      
      if (delegations.length > 0) {
        const total = delegations.reduce((sum: number, del: any) => {
          return sum + parseInt(del.balance?.amount || "0");
        }, 0);
        
        setTotalStaked(total.toString());
        setDelegationCount(delegations.length);
        // Mock rewards calculation (5% APR estimate)
        setTotalRewards(Math.floor(total * 0.05).toString());
      } else {
        // Mock data for demonstration
        setTotalStaked("0");
        setTotalRewards("0");
        setDelegationCount(0);
      }
    } catch (error) {
      console.error("Error loading staking data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalBalance = parseFloat(balance) + parseFloat(totalStaked);
  const stakedPercentage = totalBalance > 0 
    ? ((parseFloat(totalStaked) / totalBalance) * 100).toFixed(1)
    : "0";

  const stats = [
    {
      icon: Coins,
      label: "Total Balance",
      value: formatTokenAmount(totalBalance.toString()),
      suffix: "LUME",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: TrendingUp,
      label: "Total Staked",
      value: formatTokenAmount(totalStaked),
      suffix: "LUME",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Award,
      label: "Estimated Rewards",
      value: formatTokenAmount(totalRewards),
      suffix: "LUME",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Percent,
      label: "Staking Ratio",
      value: stakedPercentage,
      suffix: "%",
      color: "from-pink-500 to-purple-600",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Portfolio Analytics
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Your staking performance and statistics
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {isLoading ? (
              <div className="flex items-center justify-center py-12">
              <Clock className="animate-spin text-emerald-500" size={32} />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="text-white" size={24} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}{" "}
                      <span className="text-lg text-gray-500 dark:text-gray-400">
                        {stat.suffix}
                      </span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Delegation Summary */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border-2 border-emerald-200 dark:border-emerald-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Delegation Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Active Validators
                    </p>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                      {delegationCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Estimated APR
                    </p>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                      ~15%
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Performance Metrics
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Available to Stake
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatTokenAmount(balance)} LUME
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Staked
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatTokenAmount(totalStaked)} LUME
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Pending Rewards
                    </span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {formatTokenAmount(totalRewards)} LUME
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>Tip:</strong> Staking your LUME tokens helps secure the network and earns you rewards. The unbonding period is 21 days.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

