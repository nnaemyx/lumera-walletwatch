"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { connectKeplr, disconnectKeplr } from "@/lib/keplr";
import { getBalance, getAllBalances, getTransactionHistory } from "@/lib/cosmos-client";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  balance: string;
  allBalances: Array<{ denom: string; amount: string }>;
  transactionCount: number;
  signer: OfflineSigner | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshBalance: () => Promise<void>;
  refreshTransactionCount: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<OfflineSigner | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [allBalances, setAllBalances] = useState<
    Array<{ denom: string; amount: string }>
  >([]);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-reconnect on mount if previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem("lumera_wallet_connected");
    if (wasConnected === "true" && !address) {
      // Auto-reconnect
      connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Periodic refresh of portfolio data when connected
  useEffect(() => {
    if (!address) return;

    // Initial refresh
    refreshBalance();
    refreshTransactionCount();

    // Set up periodic refresh every 30 seconds
    const interval = setInterval(() => {
      refreshBalance();
      refreshTransactionCount();
    }, 30000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const refreshBalance = async () => {
    if (!address) return;

    try {
      const mainBalance = await getBalance(address);
      setBalance(mainBalance.amount);

      const balances = await getAllBalances(address);
      setAllBalances([...balances]);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  const refreshTransactionCount = async () => {
    if (!address) return;

    try {
      const transactions = await getTransactionHistory(address);
      setTransactionCount(transactions.length);
    } catch (err) {
      console.error("Error fetching transaction count:", err);
    }
  };

  const connect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { address: walletAddress, offlineSigner } = await connectKeplr();
      setAddress(walletAddress);
      setSigner(offlineSigner);

      // Save connection state to localStorage
      localStorage.setItem("lumera_wallet_connected", "true");
      localStorage.setItem("lumera_wallet_address", walletAddress);

      // Fetch initial balance (these can fail silently, wallet might be new)
      try {
        const mainBalance = await getBalance(walletAddress);
        setBalance(mainBalance.amount);

        const balances = await getAllBalances(walletAddress);
        setAllBalances([...balances]);

        // Fetch transaction count
        const transactions = await getTransactionHistory(walletAddress);
        setTransactionCount(transactions.length);
      } catch (fetchError: any) {
        // If fetching data fails, still allow connection but show warning
        console.warn("Failed to fetch initial portfolio data:", fetchError);
        // Set defaults
        setBalance("0");
        setAllBalances([]);
        setTransactionCount(0);
        // Don't throw - connection was successful, just data fetch failed
      }
    } catch (err: any) {
      let errorMessage = "Failed to connect wallet";
      
      if (err.message?.includes("not installed")) {
        errorMessage = "Keplr wallet is not installed. Please install Keplr extension first.";
      } else if (err.message?.includes("Failed to add")) {
        errorMessage = "Failed to add Lumera chain to Keplr. Please try again.";
      } else if (err.message?.includes("Network error") || err.message?.includes("fetch")) {
        errorMessage = "Network error: Unable to connect to Lumera Testnet. Please check your internet connection.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error("Connection error:", err);
      // Clear localStorage on connection error
      localStorage.removeItem("lumera_wallet_connected");
      localStorage.removeItem("lumera_wallet_address");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    disconnectKeplr();
    setAddress(null);
    setSigner(null);
    setBalance("0");
    setAllBalances([]);
    setTransactionCount(0);
    setError(null);
    
    // Clear localStorage on disconnect
    localStorage.removeItem("lumera_wallet_connected");
    localStorage.removeItem("lumera_wallet_address");
  };

  // Listen for Keplr account changes
  useEffect(() => {
    const handleAccountChange = () => {
      if (address) {
        // Reconnect with new account
        connect();
      }
    };

    if (window.keplr) {
      window.addEventListener("keplr_keystorechange", handleAccountChange);
    }

    return () => {
      window.removeEventListener("keplr_keystorechange", handleAccountChange);
    };
  }, [address]);

  const value: WalletContextType = {
    address,
    isConnected: !!address,
    balance,
    allBalances,
    transactionCount,
    signer,
    connect,
    disconnect,
    refreshBalance,
    refreshTransactionCount,
    isLoading,
    error,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

