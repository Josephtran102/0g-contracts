# 0G Network JOSEToken Project

## Overview
This project demonstrates a custom ERC20 token deployed on the 0G Network testnet using Hardhat, OpenZeppelin, and Solidity.

## Prerequisites
- Node.js (v16.0.0 or later)
- npm (v8.0.0 or later)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Josephtran102/0g-contracts.git
cd 0g-contracts
```
2. Install dependencies:
```bash
npm install
```
## Configuration
1. Create a .env file in the project root:
```bash
nano .env
```
2. Input private key in .env:
```bash
PRIVATE_KEY=0x1111111111111111111111111111111111111111111111111111111111111111
```
⚠️ Important: Never share your private key or commit it to version control.

## Compile Contracts
```bash
npx hardhat compile
```
Output:
```
⚡ root@josephtran  ~/0g-contracts   main  npx hardhat compile
Generating typings for: 8 artifacts in dir: typechain-types for target: ethers-v6
Successfully generated 34 typings!
Compiled 6 Solidity files successfully (evm target: paris).
```
## Run Tests
```bash
npx hardhat test
```
Output:
```
⚡ root@josephtran  ~/0g-contracts   main  npx hardhat test


  JOSEToken
    Deployment
      ✔ Should set the right name
      ✔ Should set the right symbol
      ✔ Should set the correct total supply
      ✔ Should assign the total supply to the owner
    Transfers
      ✔ Should transfer tokens between accounts
      ✔ Should fail if sender does not have enough tokens
    Approve and TransferFrom
      ✔ Should approve and transfer from another account


  7 passing (561ms)
```

## Deploy to 0G Testnet
```bash
npx hardhat run scripts/JOSEToken-deploy.ts --network 0g-testnet
```
Output:
```
 ⚡ root@josephtran  ~/0g-contracts   main  npx hardhat run scripts/JOSEToken-deploy.ts --network 0g-testnet
Deploying contracts with the account: 0xe8D2a1a4703543C2D822349fa237198682B99E4E
Transaction Hash: 0x949534a71b96a87b8a377b86bad4ed55e731c684922843b65816c5f25ca44c61
JOSEToken address: 0xDB665a5994E75501Be88420a9BfB5270f3c4243f
Explorer URL: https://chainscan-newton.0g.ai/tx/0x949534a71b96a87b8a377b86bad4ed55e731c684922843b65816c5f25ca44c61
```
## Verify Contract
```bash
npx hardhat verify --network 0g-testnet <CONTRACT_ADDRESS> "JOSE Token" "JOSE" "1000000000000000000000000"
```
## Token Details

- Name: JOSE Token
- Symbol: JOSE
- Blockchain: 0G Network Testnet
- Total Supply: 1,000,000 JOSE

## Network Configuration

- Network: 0G Testnet
- RPC URL: https://evmrpc-testnet.0g.ai
- Chain ID: 16600

## Security

- Use hardware wallets
- Never share private keys
- Be cautious with testnet and mainnet deployments

## License
Distributed under the MIT License. See LICENSE for more information.
