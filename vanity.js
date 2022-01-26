const {Worker, workerData} = require("worker_threads");

let prefix = process.argv[2].toString();
const worker = new Worker("./index.js", {workerData: {
    prefix: prefix
}});

worker.once("message", result => {
    console.log();
    console.log('address: ' + result.slice(0, 41));
    console.log('mnemonic: ' + result.slice(43, result.length));
    console.log();
});

worker.on("error", error => {
    console.log(error);
});
