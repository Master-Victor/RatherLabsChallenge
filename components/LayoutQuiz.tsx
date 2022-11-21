import React, {useState, useEffect} from 'react'
import { Layout, Row, Col, Input, Slider, Button } from 'antd';
import { useRouter } from 'next/router';
import { quizContract } from '../contract/functions';
import { useStoreUser } from '../store/store'
const { Header, Footer, Content } = Layout;

const LayoutQuiz = ({ children }: any) => {
    const [ quizCoin, setQuizCoin ] = useState<number>(0)
    const user = useStoreUser()
    // const router = useRouter()

    useEffect( () => {
        const coin = async() => user.setCoin(await quizContract(user.wallet)) 
        coin()
      }, []);

    return (
        <Row justify="space-around" style={{ paddingTop: '100px', minWidth: '100vw', minHeight: '100vh' }}>
            <Col>
                <Layout style={{ minWidth: '80vw', minHeight: '80vh' }}>
                    <Header style={{ backgroundColor: '#EEE' }}>
                           <Row>
                                <Col>Wallet: {`${user.wallet}`}</Col> 
                            </Row>
                    </Header>
                    <Content>{children}</Content>
                    <Footer>
                        <Row justify={'end'} > { user.coin } $QUIZ </Row>
                    </Footer>
                </Layout>
            </Col>
        </Row>

    )
}

export default LayoutQuiz