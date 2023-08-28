const Web3 = require("web3");
require("dotenv").config();
const contractAbi = require("./contractAbi.json");

const infuraUrl = process.env.INFURA_URL;
const walletPrivateKey = process.env.PRIVATE_KEY;
const contractAddress = "0x0d928441B1c8bB5D26213773987188182E5812eA";

const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

const walletAccount = web3.eth.accounts.privateKeyToAccount(walletPrivateKey);
web3.eth.accounts.wallet.add(walletAccount);
web3.eth.defaultAccount = walletAccount.address;

const contract = new web3.eth.Contract(contractAbi, contractAddress);

async function changeColor() {
  const newColor = "Red";

  const gasEstimate = await contract.methods
    .setColor(newColor)
    .estimateGas({ from: walletAccount.address });

  const tx = await contract.methods.setColor(newColor).send({
    from: walletAccount.address,
    gas: gasEstimate, // Set the gas limit based on the estimate
  });

  console.log("Transaction receipt:", tx);
  console.log("Color changed successfully!");
}

changeColor();
