import { id } from "ethers/lib/utils";

const Web3 = require("web3");
const BigNumber = require("bignumber.js");
const { ERC20, ERC721, AxieNFT } = require("../abi/index");
let web3 = new Web3();

const RPC_URL = "http://115.79.28.135:8545/";

web3.setProvider(new web3.providers.HttpProvider(RPC_URL));

const currencyContract = new web3.eth.Contract(ERC20.abi, ERC20.address);
const nftContract = new web3.eth.Contract(ERC721.abi, ERC721.address);
const AxieNFTContract = new web3.eth.Contract(AxieNFT.abi, AxieNFT.address);

const decimal18 = new BigNumber(10).pow(18);

const createWallet = (privateKey) => {
    const wallet = web3.eth.accounts.wallet.add(privateKey);
    web3.eth.defaultAccount = wallet.address;
    return wallet;
};

const getBalance = async (address) => {
    const decimal = new BigNumber(10).pow(18);
    const result = await currencyContract.methods.balanceOf(address).call();
    const balance = new BigNumber(result).dividedBy(decimal);
    return balance;
};
const getSymbol = async () => {
    const result = await currencyContract.methods.symbol().call();
    return result;
};

const getNftBalance = async (wallet_Address) => {
    const result = await AxieNFTContract.methods
        .balanceOf(wallet_Address)
        .call();
    return result;
};

const getNftByIndex = async (wallet_Address, index) => {
    const result = await AxieNFTContract.methods
        .tokenOfOwnerByIndex(wallet_Address, index)
        .call();
    return result;
};

const getNftInfo = async (tokenId) => {
    const result = await AxieNFTContract.methods.getAxie(tokenId).call();
    return result;
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
    const sendAmount = new BigNumber(amount).multipliedBy(decimal18);
    const result = await currencyContract.methods
        .transfer(receiver, sendAmount)
        .send({ from: wallet.address, gasLimit: 290000, gasPrice: 0 });
    return result;
};

const transferNFT = async (wallet, receiver, tokenId) => {
    const result = await AxieNFTContract.methods
        .transferFrom(wallet.address, receiver, tokenId)
        .send({ from: wallet.address, gasLimit: 290000, gasPrice: 0 });
    return result;
};

export {
    getBalance,
    createWallet,
    getSymbol,
    getAllNft,
    transferToken,
    transferNFT,
};
