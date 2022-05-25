import { IDM, ERC20, RPC_URL } from "../config/IDM";
import { ethers } from "ethers";
const Web3 = require("web3");
const BigNumber = require("bignumber.js");
let web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider(RPC_URL));

const decimal18 = new BigNumber(10).pow(18);

const createWallet = (privateKey) => {
    const wallet = web3.eth.accounts.wallet.add(privateKey);
    web3.eth.defaultAccount = wallet.address;
    return wallet;
};

const getBalance = async (address) => {
    try {
        const ERC20Contract = new web3.eth.Contract(ERC20.abi, ERC20.address);
        const decimal = new BigNumber(10).pow(18);
        const result = await ERC20Contract.methods.balanceOf(address).call();
        const balance = new BigNumber(result).dividedBy(decimal);
        console.log("Balance", balance);
        return balance;
    } catch (err) {
        alert(err);
    }
};
const getSymbol = async () => {
    try {
        const ERC20Contract = new web3.eth.Contract(ERC20.abi, ERC20.address);
        const result = await ERC20Contract.methods.symbol().call();
        console.log(result);
        return result;
    } catch (err) {
        alert(err);
    }
};

const getNftBalance = async (wallet_Address) => {
    try {
        const ERC721Contract = new web3.eth.Contract(
            ERC721.abi,
            ERC721.address
        );
        const result = await ERC721Contract.methods
            .balanceOf(wallet_Address)
            .call();
        return result;
    } catch (err) {
        alert(err);
    }
};

const getNftByIndex = async (wallet_Address, index) => {
    try {
        const ERC721Contract = new web3.eth.Contract(
            ERC721.abi,
            ERC721.address
        );
        const result = await ERC721Contract.methods
            .balanceOf(wallet_Address)
            .call();
        return result;
    } catch (err) {
        alert(err);
    }
};

const getNftInfo = async (tokenId) => {
    try {
        const ERC721Contract = new web3.eth.Contract(
            ERC721.abi,
            ERC721.address
        );
        const result = await ERC721Contract.methods.getAxie(tokenId).call();
        return result;
    } catch (err) {
        alert(err);
    }
};

const getAllNft = async (wallet_Address) => {
    let axieIds = [];
    const balance = await getNftBalance(wallet_Address);
    for (let i = 0; i < balance; i++) {
        const axieId = await getNftByIndex(wallet_Address, i);
        axieIds.push(axieId);
    }
    return axieIds;
};

const transferToken = async (wallet, receiver, amount) => {
    try {
        const ERC20Contract = new web3.eth.Contract(ERC20.abi, ERC20.address);
        const sendAmount = new BigNumber(amount).multipliedBy(decimal18);
        const result = await ERC20Contract.methods
            .transfer(receiver, sendAmount)
            .send({ from: wallet.address, gasLimit: 290000, gasPrice: 0 });
        return result;
    } catch (err) {
        alert(err);
    }
};

const transferNFT = async (wallet, receiver, tokenId) => {
    try {
        const ERC721Contract = new web3.eth.Contract(
            ERC721.abi,
            ERC721.address
        );
        const result = await ERC721Contract.methods
            .transferFrom(wallet.address, receiver, tokenId)
            .send({ from: wallet.address, gasLimit: 290000, gasPrice: 0 });
        return result;
    } catch (err) {
        alert(err);
    }
};

export {
    getBalance,
    createWallet,
    getSymbol,
    getAllNft,
    transferToken,
    transferNFT,
};
