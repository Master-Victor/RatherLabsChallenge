import { Button } from 'antd';
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useStoreUser } from '../store/store'
import { quizContract } from '../contract/functions'
declare global {
  interface Window {
    ethereum: any
  }
}

const ConnectionButton = ({ children }: any) => {
  const [buttonText, setButtonText] = useState(children)
  const router = useRouter()
  const user = useStoreUser()

  const connectarWallet = async() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((result: string[]) => {
          user.setWallet(result[0])
          quizContract(result[0])
            .then( coin => {
              user.setCoin(coin)
              router.push('/QuizHome')
            } )
            .catch( (e : any) => console.log(e) )
          // if (!(window.ethereum.chainId === '0x5'))
          //   switchChain(result[0])
          // else
        })
        .catch((error: string) => setButtonText(error))
    }
  }

  const switchChain = async (wallet: string) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      });
      router.push('/QuizHome')
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x5',
                chainName: 'Görli',
                rpcUrls: ['https://www.ethercluster.com/goerli'],
              },
            ],
          })
          router.push('/QuizHome')
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }



  return (
    <>
      <Button onClick={connectarWallet} > {buttonText} </Button>
    </>
  )
}

export default ConnectionButton