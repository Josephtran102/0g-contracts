import { expect } from "chai";
import { ethers } from "hardhat";
import { JOSEToken } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("JOSEToken", function () {
  let joseToken: JOSEToken;
  let owner: HardhatEthersSigner;
  let recipient: HardhatEthersSigner;

  const NAME = "JOSE Token";
  const SYMBOL = "JOSE";
  const TOTAL_SUPPLY = ethers.parseUnits("1000000", 18);

  beforeEach(async function () {
    // Lấy signers
    const [ownerSigner, recipientSigner] = await ethers.getSigners();
    owner = ownerSigner;
    recipient = recipientSigner;

    // Deploy contract
    const JOSETokenFactory = await ethers.getContractFactory("JOSEToken");
    joseToken = await JOSETokenFactory.deploy(NAME, SYMBOL, TOTAL_SUPPLY);
  });

  describe("Deployment", function () {
    it("Should set the right name", async function () {
      expect(await joseToken.name()).to.equal(NAME);
    });

    it("Should set the right symbol", async function () {
      expect(await joseToken.symbol()).to.equal(SYMBOL);
    });

    it("Should set the correct total supply", async function () {
      expect(await joseToken.totalSupply()).to.equal(TOTAL_SUPPLY);
    });

    it("Should assign the total supply to the owner", async function () {
      const ownerBalance = await joseToken.balanceOf(owner.address);
      expect(ownerBalance).to.equal(TOTAL_SUPPLY);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseUnits("100", 18);
      
      // Transfer tokens from owner to recipient
      await joseToken.transfer(recipient.address, transferAmount);

      // Check balances
      const recipientBalance = await joseToken.balanceOf(recipient.address);
      expect(recipientBalance).to.equal(transferAmount);

      const ownerBalance = await joseToken.balanceOf(owner.address);
      expect(ownerBalance).to.equal(TOTAL_SUPPLY - transferAmount);
    });

    it("Should fail if sender does not have enough tokens", async function () {
      const ownerBalance = await joseToken.balanceOf(owner.address);
      const transferAmount = ownerBalance + ethers.parseUnits("1", 18);

      // Expect transfer to be reverted
      await expect(
        joseToken.transfer(recipient.address, transferAmount)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });
  });

  describe("Approve and TransferFrom", function () {
    it("Should approve and transfer from another account", async function () {
      const approveAmount = ethers.parseUnits("50", 18);
      
      // Approve recipient to spend tokens
      await joseToken.approve(recipient.address, approveAmount);

      // Check allowance
      const allowance = await joseToken.allowance(owner.address, recipient.address);
      expect(allowance).to.equal(approveAmount);

      // Connect as recipient and transfer tokens
      const tokenAsRecipient = joseToken.connect(recipient);
      await tokenAsRecipient.transferFrom(owner.address, recipient.address, approveAmount);

      // Check balances
      const recipientBalance = await joseToken.balanceOf(recipient.address);
      expect(recipientBalance).to.equal(approveAmount);
    });
  });
});