import { IDM, ERC20, RPC_URL } from "../config/IDM";
const ethers = require("ethers");
const Web3 = require("web3");
let web3 = new Web3();
const BigNumber = require("bignumber.js");
const decimal18 = new BigNumber(10).pow(18);

web3.setProvider(new web3.providers.HttpProvider(RPC_URL));

const createWallet = (privateKey) => {
    const wallet = web3.eth.accounts.wallet.add(privateKey);
    web3.eth.defaultAccount = wallet.address;
    return wallet;
};

const createUserIdentity = async (email, pk) => {
    try {
        var uid = ethers.utils.id(email);
        var signer = new ethers.utils.SigningKey(pk);
        var digest = ethers.utils.solidityKeccak256(
            ["string", "bytes32"],
            ["\x19Ethereum Signed Message:\n32", uid]
        );
        var sig = signer.signDigest(digest);
        const IDMContract = new web3.eth.Contract(IDM.abi, IDM.address);
        const wallet = createWallet(
            "0000000000000000000000000000000000000000000000000000000000000001"
        );
        console.log("Wallet Address ! ", wallet.address);
        const tx = await IDMContract.methods
            .createIdentity(uid, sig.v, sig.r, sig.s)
            .send({
                from: wallet.address,
                gas: 290000,
                gasPrice: 0,
            });
        console.log("TX :", tx);
    } catch (err) {
        alert("Email existed !");
        console.log("ERROR in web3Call :", err);
    }
};

const recoveryUserIdentity = async (email, pk) => {
    try {
        const uid = ethers.utils.id(email);
        console.log("UID : ", uid);
        var signer = new ethers.utils.SigningKey(pk);
        var digest = ethers.utils.solidityKeccak256(
            ["string", "bytes32"],
            ["\x19Ethereum Signed Message:\n32", uid]
        );
        var sig = signer.signDigest(digest);
        const wallet = createWallet(
            "0000000000000000000000000000000000000000000000000000000000000001"
        );
        const IDMContract = new web3.eth.Contract(IDM.abi, IDM.address);
        var result = await IDMContract.methods
            .startRecovery(uid, sig.v, sig.r, sig.s)
            .send({ from: wallet.address, gasLimit: 290000, gasPrice: 0 });
        console.log("Result startRecovery : ", result);
        result = await IDMContract.methods
            .approveRecovery(uid)
            .send({ from: wallet.address, gasPrice: 0, gasLimit: 290000 });
        console.log("Result approveRecovery : ", result);
        result = await IDMContract.methods
            .completeRecovery(uid)
            .send({ from: wallet.address, gasPrice: 0, gasLimit: 290000 });
        console.log("Result completeRecovery : ", result);
        return result;
    } catch (err) {
        console.log(err);
    }
};

const getSignerUserById = async (email) => {
    try {
        extendWeb3(web3);
        var uid = ethers.utils.id(email);
        const signer = await web3.Recover.getSignerById(uid);
        return signer;
    } catch (err) {
        console.log(err);
    }
};
const getWalletById = async (email) => {
    try {
        extendWeb3(web3);
        var uid = ethers.utils.id(email);
        const wallet = await web3.Recover.getWalletById(uid);
        return wallet;
    } catch (err) {
        console.log(err);
    }
};
// const getSignerUserById = async (email) => {
//     try {
//         const IDMContract = new web3.eth.Contract(IDM.abi, IDM.address);
//         var uid = ethers.utils.id(email);
//         const result = await IDMContract.methods.getSignerById(uid).call();
//         return result;
//     } catch (err) {
//         console.log(err);
//     }
// };

const getUserWalletById = async (email) => {
    try {
        const IDMContract = new web3.eth.Contract(IDM.abi, IDM.address);
        const uid = ethers.utils.id(email);
        const result = await IDMContract.methods.getWalletById(uid).call();
        return result;
    } catch (err) {
        console.log("Error");
    }
};

const transferToken = async (emailTo, amount, pk) => {
    try {
        const wallet = createWallet(pk);
        console.log("Wallet Address", wallet.address);
        const receiver = await getUserWalletById(emailTo);
        console.log("Receiver : ", receiver);
        const ERC20Contract = new web3.eth.Contract(ERC20.abi, ERC20.address);
        const sendAmount = new BigNumber(amount).multipliedBy(decimal18);
        console.log("Sender : ", wallet.address);
        const result = await ERC20Contract.methods
            .transfer(receiver, sendAmount)
            .send({ from: wallet.address, gasLimit: "100000", gasPrice: "0" });
        console.log("Transfer Result", result);
        return result;
    } catch (err) {
        console.log(err);
    }
};

const signUid = (uid, pk) => {
    var signer = new ethers.utils.SigningKey(pk);
    var digest = ethers.utils.solidityKeccak256(
        ["string", "bytes32"],
        ["\x19Ethereum Signed Message:\n32", uid]
    );
    var sig = signer.signDigest(digest);
    return sig;
};

const createIdentity = async (email, pk) => {
    try {
        extendWeb3(web3);
        const uid = ethers.utils.id(email);
        const sig = signUid(uid, pk);
        const wallet = await web3.Recover.createIdentity(
            uid,
            sig.v,
            sig.r,
            sig.s
        );
        const signer = await web3.Recover.getSignerById(uid);
        console.log("Wallet createIdentity: ", wallet);
        console.log("Siger createIdentity : ", signer);
        return wallet;
    } catch (err) {
        console.log(err);
    }
};

const recoveryIdentity = async (email, pk) => {
    try {
        extendWeb3(web3);
        const uid = ethers.utils.id(email);
        const sig = signUid(uid, pk);
        const wallet = await web3.Recover.startRecovery(
            uid,
            sig.v,
            sig.r,
            sig.s
        );
        const signer = await web3.Recover.getSignerById(uid);
        console.log("Wallet recovery: ", wallet);
        console.log("Siger recovery : ", signer);
        return wallet;
    } catch (err) {
        console.log(err);
    }
};
function extendWeb3(web3) {
    web3.extend({
        property: "Recover",
        methods: [
            {
                name: "createIdentity",
                call: "vch_createIdentity",
                params: 4,
            },
            { name: "getSignerById", call: "vch_getSignerById", params: 1 },
            { name: "startRecovery", call: "vch_startRecovery", params: 4 },
            { name: "getWalletById", call: "vch_getWalletById", params: 1 },
        ],
    });
    return web3;
}
export {
    recoveryIdentity,
    recoveryUserIdentity,
    getSignerUserById,
    getUserWalletById,
    getWalletById,
    transferToken,
    createUserIdentity,
    createIdentity,
};
