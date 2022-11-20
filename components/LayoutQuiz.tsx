import React, {useState, useEffect} from 'react'
import { Layout, Row, Col, Input, Slider, Button } from 'antd';
import { useRouter } from 'next/router';
import { useCountdown } from './CustomHooks/useCountdown '
import { quizContract } from '../contract/functions';

const { Header, Footer, Content } = Layout;

const LayoutQuiz = ({ children }: any) => {
    const [countDown, setCountDown] = useState<number>(20);
    const [ quizCoin, setQuizCoin ] = useState<number>(0)
    useEffect(() => {
        const interval = setInterval(() => {
            if( countDown >= 0 ) setCountDown(countDown - 1);
            else console.log('redireccionar')
        }, 1000);
    
        return () => clearInterval(interval);
      }, [countDown, setCountDown]);

    const router = useRouter()

    useEffect( () => {
        const coin = async() => setQuizCoin(await quizContract()) 
        coin()
      }, []);

    return (
        <Row justify="space-around" style={{ paddingTop: '100px', minWidth: '100vw', minHeight: '100vh' }}>
            <Col>
                <Layout style={{ minWidth: '80vw', minHeight: '80vh' }}>
                    <Header style={{ backgroundColor: '#EEE' }}>
                           <Row>
                                <Col span={12}>Wallet: {`${router.query.wallet}`}</Col> 
                                <Col span={12}><Slider style={{ paddingTop: '20px' }} min={0} max={10} step={0.01} value={ countDown }/></Col> 
                            </Row>
                    </Header>
                    <Content>{children}</Content>
                    <Footer>
                        <Row justify={'end'} > { quizCoin } $QUIZ </Row>
                    </Footer>
                </Layout>
            </Col>
        </Row>

    )
}

export default LayoutQuiz