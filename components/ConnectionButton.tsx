import { Button } from 'antd';
import React, { useState } from 'react'

declare global {
    interface Window {
        ethereum: any
    }
}

const ConnectionButton = () => {

    const [buttonText, setButtonText] = useState(' conectar ')
    const [account, setAccount] = useState<string>();

    const connectarWallet = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((result: string[]) => {
                    setAccount(result[0])
                    if( !(window.ethereum.chainId === '0x5') ) 
                        switchChain()
                    else
                        console.log('welcome')
                })
                .catch((error: string) => setButtonText(error))
        }
    }

    const switchChain = async () => {
        try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x5' }],
            });
          } catch (switchError : any) {
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
                });
              } catch (addError) {
                // handle "add" error
              }
            }
            // handle other "switch" errors
          }
    }



    return (
        <>
            <Button onClick={connectarWallet} > {buttonText}{account} </Button>
            <Button onClick={switchChain}> change chain </Button>
        </>
    )
}

export default ConnectionButton