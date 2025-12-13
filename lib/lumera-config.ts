// Lumera Blockchain Configuration
export const LUMERA_CONFIG = {
  chainId: "lumera-testnet-2",
  chainName: "Lumera Testnet",
  rpc: "https://rpc.lumera.test.at.htw.tech",
  rest: "https://api.lumera.test.at.htw.tech",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "lumera",
    bech32PrefixAccPub: "lumerapub",
    bech32PrefixValAddr: "lumeravaloper",
    bech32PrefixValPub: "lumeravaloperpub",
    bech32PrefixConsAddr: "lumeravalcons",
    bech32PrefixConsPub: "lumeravalconspub",
  },
  currencies: [
    {
      coinDenom: "LUME",
      coinMinimalDenom: "ulume",
      coinDecimals: 6,
      coinGeckoId: "lumera",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "LUME",
      coinMinimalDenom: "ulume",
      coinDecimals: 6,
      coinGeckoId: "lumera",
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "LUME",
    coinMinimalDenom: "ulume",
    coinDecimals: 6,
    coinGeckoId: "lumera",
  },
  features: ["ibc-transfer", "ibc-go", "cosmwasm"],
};

export const GAS_PRICE = "0.025ulume";

