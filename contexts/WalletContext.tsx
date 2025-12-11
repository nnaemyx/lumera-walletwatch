"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { connectKeplr, disconnectKeplr } from "@/lib/keplr";
import { getBalance, getAllBalances } from "@/lib/cosmos-client";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  balance: string;
  allBalances: Array<{ denom: string; amount: string }>;
  signer: OfflineSigner | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshBalance: () => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-reconnect on mount if previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem("lumera_wallet_connected");
    if (wasConnected === "true" && !address) {
      // Auto-reconnect
      connect();
    }
  }, []);

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

      // Fetch initial balance
      const mainBalance = await getBalance(walletAddress);
      setBalance(mainBalance.amount);

      const balances = await getAllBalances(walletAddress);
      setAllBalances([...balances]);
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
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
    signer,
    connect,
    disconnect,
    refreshBalance,
    isLoading,
    error,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

