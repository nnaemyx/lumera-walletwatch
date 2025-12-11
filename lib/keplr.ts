import { Window as KeplrWindow } from "@keplr-wallet/types";
import { LUMERA_CONFIG } from "./lumera-config";

declare global {
  interface Window extends KeplrWindow {}
}

export const connectKeplr = async () => {
  if (!window.keplr) {
    throw new Error("Keplr wallet is not installed");
  }

  try {
    // Try to enable the chain
    await window.keplr.enable(LUMERA_CONFIG.chainId);
  } catch (error) {
    // If the chain is not registered, suggest adding it
    try {
      await window.keplr.experimentalSuggestChain({
        chainId: LUMERA_CONFIG.chainId,
        chainName: LUMERA_CONFIG.chainName,
        rpc: LUMERA_CONFIG.rpc,
        rest: LUMERA_CONFIG.rest,
        bip44: LUMERA_CONFIG.bip44,
        bech32Config: LUMERA_CONFIG.bech32Config,
        currencies: LUMERA_CONFIG.currencies,
        feeCurrencies: LUMERA_CONFIG.feeCurrencies,
        stakeCurrency: LUMERA_CONFIG.stakeCurrency,
        features: LUMERA_CONFIG.features,
      });

      await window.keplr.enable(LUMERA_CONFIG.chainId);
    } catch (suggestError) {
      throw new Error("Failed to add Lumera chain to Keplr");
    }
  }

  const offlineSigner = window.keplr.getOfflineSigner(LUMERA_CONFIG.chainId);
  const accounts = await offlineSigner.getAccounts();

  return {
    address: accounts[0].address,
    offlineSigner,
  };
};

export const disconnectKeplr = () => {
  // Keplr doesn't have a programmatic disconnect, but we can clear our state
  return true;
};

