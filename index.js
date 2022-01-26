const {parentPort, workerData} = require("worker_threads");
const bip39 = require('bip39');
const ethers = require('ethers');

function getVanity() {
    while (true) {
        let mnemonic = bip39.generateMnemonic();
        let len = workerData.prefix.length;
        let address = ethers.Wallet.fromMnemonic(mnemonic).address;
        let index = address.toString().slice(0,len);
        if (index == workerData.prefix) {
            return address + ' ' + mnemonic;
        }
    };
};
parentPort.postMessage(getVanity(workerData.index, workerData.prefix));