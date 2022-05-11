import * as Random from "expo-random";
import { ethers, Wallet } from "ethers";

const generateMnemonic = () => {
    const randomBytes = Random.getRandomBytes(16);
    const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
    return mnemonic;
};

const generateWallet = (mnemonic) => {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    return wallet;
};

const getBalance = async () => {
    const balance = await provider.getBalance(walletAddress);
    console.log(balance);
    return balance;
};

export { generateMnemonic, generateWallet, getBalance };
