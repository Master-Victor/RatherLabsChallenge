import { Button, Spin } from 'antd';
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useStoreUser } from '../store/store'
import { quizContract } from '../contract/functions'

const ConnectionButton = ({ children }: any) => {
  const [buttonText, setButtonText] = useState(children)
  const router = useRouter()
  const user = useStoreUser()
  const [loading, setLoading] = useState<boolean>(false)

  const connectarWallet = async () => {
    setLoading(true)
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(async (result: string[]) => {
          user.setWallet(result[0])
          if (window.ethereum.chainId === '0x5') {
            const coin = await quizContract(result[0])
            user.setCoin(coin)
          }
          router.push('/QuizHome')
          setLoading(false)
        })
        .catch((error: string) => {
          setLoading(false)
          setButtonText(error)
        })
    }
  }



  return (
    <Spin spinning={loading} size={'large'}>
      <Button onClick={connectarWallet} > {buttonText} </Button>
    </Spin>
  )
}

export default ConnectionButton