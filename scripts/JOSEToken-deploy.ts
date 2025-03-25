import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const JOSEToken = await ethers.getContractFactory("JOSEToken");
  const name = "JOSE Token";
  const symbol = "JOSE";
  const mintedTokens = ethers.parseUnits("1000000", 18);
  
  const joseToken = await JOSEToken.deploy(name, symbol, mintedTokens);
  
  
  const deploymentReceipt = await joseToken.deploymentTransaction()?.wait();
  
  console.log("Transaction Hash:", deploymentReceipt?.hash);
  console.log("JOSEToken address:", joseToken.target);
  
  
  if (deploymentReceipt?.hash) {
    console.log("Explorer URL:", `https://chainscan-newton.0g.ai/tx/${deploymentReceipt.hash}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });