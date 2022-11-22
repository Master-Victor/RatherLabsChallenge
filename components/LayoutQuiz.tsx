import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Input, Slider, Button } from 'antd';
import { quizContract } from '../contract/functions';
import { useStoreUser } from '../store/store'
import { CheckOutlined } from '@ant-design/icons'
const { Header, Footer, Content } = Layout;

const LayoutQuiz = ({ children }: any) => {
    const user = useStoreUser()
    const [switched, setSwitched] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const switchChain = async () => {
        setLoading(true)
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x5' }],
            });
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
                    setSwitched(true)
                    setLoading(false)
                } catch (addError) {
                    // handle "add" error
                    setSwitched(false)
                    setLoading(false)
                    console.log(addError)
                }
            }
        }
    }

    useEffect(() => {
        const coin = async () => user.setCoin(await quizContract(user.wallet))
        coin()
    }, []);

    return (
        <Row justify="space-around" style={{ paddingTop: '100px', minWidth: '100vw', minHeight: '100vh' }}>
            <Col>
                <Layout style={{ minWidth: '80vw', minHeight: '80vh' }}>
                    <Header style={{ backgroundColor: '#EEE' }}>
                        <Row>
                            <Col span={12}>Wallet: {`${user.wallet}`}</Col>
                            <Col span={12} style={{ paddingLeft: "20vw" }} >
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
                        <Row justify={'end'} > {user.coin} $QUIZ </Row>
                    </Footer>
                </Layout>
            </Col>
        </Row>

    )
}

export default LayoutQuiz