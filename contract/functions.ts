const Web3Conection = require('./ABI/web3connectionQuiz.json')
import { ethers } from "ethers"

let contract
const Address = process.env.CONTRACT || '0x147e4F2Ff4e3618EdbfFec2B86988e583198383B'

export const submitContract = async (quizID: number, respuestas: number[]) => {
  const ABI = Web3Conection
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  contract = new ethers.Contract(String(Address), ABI, signer)
  try {
    const { hash } = await contract.submit(quizID, respuestas)
    return hash
  } catch (error) {
    console.log(error)
  }
}

export const quizContract = async (wallet: string) => {
  const ABI = Web3Conection
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  contract = new ethers.Contract(String(Address), ABI, signer)
  const hex: any = await contract.balanceOf(wallet)
  const hexString = ethers.utils.formatEther(hex)
  return parseInt(hexString)
}

export function checkTransactionconfirmation(txhash: string) {

  let checkTransactionLoop = () => {
    return window.ethereum.request({ method: 'eth_getTransactionReceipt', params: [txhash] }).then((r: any) => {
      if (r != null) return 'confirmed'
      else return checkTransactionLoop()
    })
  }

  return checkTransactionLoop()
}