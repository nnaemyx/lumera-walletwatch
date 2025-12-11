"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { X, ArrowUpRight, ArrowDownLeft, TrendingUp, Clock, ExternalLink, Award } from "lucide-react";
import { LUMERA_CONFIG } from "@/lib/lumera-config";
import { getTransactionHistory, TransactionDetail } from "@/lib/cosmos-client";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  const { address } = useWallet();
  const [transactions, setTransactions] = useState<TransactionDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && address) {
      loadTransactions();
    }
  }, [isOpen, address]);

  const loadTransactions = async () => {
    if (!address) return;
    
    setIsLoading(true);
    try {
      const txs = await getTransactionHistory(address);
      setTransactions(txs);
      
      if (txs.length > 0) {
        console.log(`✅ Loaded ${txs.length} real transactions from blockchain`);
      } else {
        console.log("ℹ️ No transactions found for this address yet");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.includes("Send") || type.includes("Transfer")) {
      return <ArrowUpRight className="text-orange-500" size={20} />;
    } else if (type.includes("Delegate")) {
      return <TrendingUp className="text-green-500" size={20} />;
    } else if (type.includes("Undelegate")) {
      return <ArrowDownLeft className="text-red-500" size={20} />;
    } else if (type.includes("Reward") || type.includes("Claim")) {
      return <Award className="text-yellow-500" size={20} />;
    }
    return <ArrowDownLeft className="text-blue-500" size={20} />;
  };

  const getTypeColor = (type: string) => {
    if (type.includes("Send")) return "text-orange-600 bg-orange-100 dark:bg-orange-900/30";
    if (type.includes("Delegate") && !type.includes("Undelegate")) return "text-green-600 bg-green-100 dark:bg-green-900/30";
    if (type.includes("Undelegate")) return "text-red-600 bg-red-100 dark:bg-red-900/30";
    if (type.includes("Reward") || type.includes("Claim")) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
    return "text-blue-600 bg-blue-100 dark:bg-blue-900/30";
  };
  
  const formatDenom = (denom?: string) => {
    if (!denom) return "LUME";
    if (denom === "ulume") return "LUME";
    return denom.toUpperCase();
  };
  
  const shortenAddress = (addr?: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Transaction History
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Recent transactions on Lumera
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Clock className="animate-spin text-emerald-500" size={32} />
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <Clock size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No transactions yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Your transaction history will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx, index) => (
                <div
                  key={tx.hash || index}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">{getTypeIcon(tx.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {tx.type}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(tx.type)}`}>
                            {tx.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {tx.timestamp}
                        </p>
                        
                        {/* Show address details */}
                        {tx.to && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            To: <span className="font-mono">{shortenAddress(tx.to)}</span>
                          </p>
                        )}
                        {tx.validatorAddress && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Validator: <span className="font-mono">{shortenAddress(tx.validatorAddress)}</span>
                          </p>
                        )}
                        {tx.memo && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 italic">
                            "{tx.memo}"
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                          <span>Height: {tx.height}</span>
                          <a
                            href={`https://explorer.lumera.io/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                          >
                            View <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                    {tx.amount && (
                      <div className="text-right ml-3">
                        <p className="font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          {parseFloat(tx.amount).toFixed(6)} {formatDenom(tx.denom)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

