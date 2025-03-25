import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "dotenv/config";

const config: HardhatUserConfig = {
  sourcify: {
    enabled: false
  },

  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    "0g-testnet": {
      url: "https://evmrpc-testnet.0g.ai",
      accounts: 
        process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 16600 // Chain ID của 0G Network Testnet
    }
  },
  etherscan: {
    apiKey: {
      "0g-testnet": "1UW4MIMUYTMN9KD2MEG13XKBBH825D2PUZ" // Nếu có block explorer
    },
    customChains: [
      {
        network: "0g-testnet",
        chainId: 16600,
        urls: {
          apiURL: "https://chainscan-test.0g.ai/open/api", // URL của block explorer nếu có
          browserURL: "https://chainscan-newton.0g.ai/" // URL của block explorer nếu có
        }
      }
    ]
  }
};

export default config;