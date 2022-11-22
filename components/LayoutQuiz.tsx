import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Input, Slider, Button, Spin } from 'antd';
import { quizContract } from '../contract/functions';
import { useStoreUser } from '../store/store'
import { CheckOutlined } from '@ant-design/icons'
const { Header, Footer, Content } = Layout;

const LayoutQuiz = ({ children }: any) => {

    const user = useStoreUser()
    const [switched, setSwitched] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [coin, setCoin] = useState<number>(-1)

    const switchChain = async () => {
        setLoading(true)
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x5' }],
            })
            const coinContract = await quizContract(user.wallet)
            user.setCoin(coinContract)
            setSwitched(true)
            setLoading(false)
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
                    setCoin(await quizContract(user.wallet))
                    user.setCoin(coin)
                    setSwitched(true)
                    setLoading(false)
                } catch (addError) {
                    // handle "add" error
                    setSwitched(false)
                    setLoading(false)
                    console.log(addError)
                }
            }else{
                setLoading(false)
            }
        }
    }
    useEffect(() => {
        const consultar = async () => {
            try {
                setCoin(await quizContract(user.wallet))
                setSwitched(true)
                console.log(coin)                
                if( coin === -1 ) setSwitched(false)
            } catch (error) {
                console.log(error)
            }
        }
        consultar()
    }, [coin, setCoin, user])

    return (
        <Spin spinning={loading} size={'large'}>
            <Row justify="space-around" style={{ paddingTop: '100px', minWidth: '100vw', minHeight: '100vh' }}>
                <Col>
                    <Layout style={{ minWidth: '80vw', minHeight: '80vh' }}>
                        <Header style={{ backgroundColor: '#EEE' }}>
                            <Row>
                                <Col span={14} style={{ whiteSpace: 'nowrap',textOverflow: 'ellipsis',overflow: 'hidden' }}>Wallet: {`${user.wallet}`}</Col>
                                <Col span={10} style={{ paddingLeft: "20vw" }} >
                                    {
                                        switched
                                            ? <CheckOutlined />
                                            : <Button onClick={() => switchChain()} loading={loading}>
                                                switch goerli
                                            </Button>
                                    }

                                </Col>
                            </Row>
                        </Header>
                        <Content>{children}</Content>
                        <Footer>
                            <Row justify={'end'} > {user.coin === -1 ? 'Error de Red' : `$QUIZ: ${user.coin}`}  </Row>
                        </Footer>
                    </Layout>
                </Col>
            </Row>
        </Spin>
    )
}

export default LayoutQuiz