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
touch .env
#PRIVATE_KEY=your_private_key_here
```
⚠️ Important: Never share your private key or commit it to version control.

## Available Scripts
## Compile Contracts
```bash
npx hardhat compile
```
## Run Tests
```bash
npx hardhat test
```
## Deploy to 0G Testnet
```bash
npx hardhat run scripts/JOSEToken-deploy.ts --network 0g-testnet
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
