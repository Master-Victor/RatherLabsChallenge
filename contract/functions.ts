import Web3 from 'web3';

const Web3Conection = require ('./ABI/web3connectionTest.json');
// const Web3Conection = require ('./ABI/web3connectionQuiz.json');
// const BSC_TESTNET_RPC = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
// const BSC_TESTNET_RPC =  'https://mainnet.infura.io/v3/585073eccb3f42fa86546111eb5d96ad'

// const BSC_TESTNET_RPC = 'https://www.ethercluster.com/goerli'

// const BSC_TESTNET_RPC = 'https://data-seed-prebsc-1-s3.binance.org:8545'

// const BSC_TESTNET_RPC = "http://goerli.prylabs.net/" cors error

// const BSC_TESTNET_RPC = "http://goerli.blockscout.com/"

// const BSC_TESTNET_RPC = "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"

// const Contract = require("web3-eth-contract");

// Contract.setProvider(BSC_TESTNET_RPC);

// const Contract_Address = "0x6E3A99C60fb6d2D78B8F383c1A825122f627458a";
const Contract_Address = "0x74F0B668Ea3053052DEAa5Eedd1815f579f0Ee03"

declare global {
    interface Window {
        ethereum: any
        web3: any
    }
}

const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            // Acccounts now exposed
            window.web3.eth.sendTransaction({method: 'eth_requestAccounts'});
        } catch (error) {
            // User denied account access...
        }
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};

export const loadData = async () => {
    await loadWeb3();
    const senderAddress = "0x74F0B668Ea3053052DEAa5Eedd1815f579f0Ee03"
    const receiverAddress = "0x2eFDd91E84B9848FB746421aF763F4a795De0437"
    // const Contract_Web3_Conection = new Contract(Web3Conection.output.abi, Contract_Address);

    // const Contract_Web3_Conection = new Contract(Web3Conection, Contract_Address);
    const Contract_Web3_Conection = new window.web3.eth.Contract( Web3Conection, Contract_Address )

    const addressAccount = await window.web3.eth.getCoinbase();

    Contract_Web3_Conection.methods.number().call()
    
    // const number = await Contract_Web3_Conection.methods.number().call();
    // const simbolo = await Contract_Web3_Conection.methods.symbol().call();
    // await Contract_Web3_Conection.methods.setCooldown( 1 ).call()
    // await Contract_Web3_Conection.methods.submit(123, [] ).call()
    // console.log(simbolo)
    const number = 0

    return { Contract_Web3_Conection, addressAccount, number, Contract_Address };
};
