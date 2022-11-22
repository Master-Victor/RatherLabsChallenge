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
        .then( async(result: string[]) => {
          user.setWallet(result[0])
          console.log(result[0])
          
          const coin = await quizContract(result[0])
            user.setCoin(coin)
            router.push('/QuizHome')
        })
        .catch((error: string) => setButtonText(error))
    }
  }



  return (
    <>
      <Button onClick={connectarWallet} > {buttonText} </Button>
    </>
  )
}

export default ConnectionButton