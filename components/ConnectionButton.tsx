import { Button } from 'antd';
import React, { useState } from 'react'
import { useRouter } from 'next/router'

declare global {
    interface Window {
        ethereum: any
    }
}

const ConnectionButton = ( { children } : any) => {
    const [buttonText, setButtonText] = useState(children)
    const router = useRouter()

    const connectarWallet = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((result: string[]) => {
                    console.log(result[0])
                    if( !(window.ethereum.chainId === '0x5') ) 
                        switchChain(result[0])
                    else
                        router.push({          
                          pathname: '/QuizHome',
                          query: { wallet: result[0] },
                        })
                })
                .catch((error: string) => setButtonText(error))
        }
    }

    const switchChain = async ( wallet : string ) => {
        try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x5' }],
            });
            router.push({          
              pathname: '/QuizHome',
              query: { wallet: wallet },
            })                    
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
                })
                router.push({          
                  pathname: '/QuizHome',
                  query: { wallet: wallet },
                })                
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