import { getSnapshot } from 'mobx-state-tree'
import React, { useState } from 'react'
import { useStoreUser } from '../store/store'
import LayoutQuiz from '../components/LayoutQuiz'
import { Button, Card, Spin, notification  } from 'antd'
import { submitContract, checkTransactionconfirmation, quizContract } from '../contract/functions'
import { useRouter } from 'next/router'
import Redirect from '../components/Redirect'
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';

const QuizFinish = () => {
    const user = useStoreUser()
    const router = useRouter()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [api, contextHolder] = notification.useNotification()

    const openNotificationError = () => {
        api.open({
          message: 'Error de Red',
          description:
            'Para poder enviar las respuestas es necesario cambiar de red.',
          icon: <FrownOutlined style={{ color: '#eb3434' }} />,
        })
      }

      const openNotificationSuccess = () => {
        api.open({
          message: 'Enviado!',
          description:
            'Se pudo enviar correctamente las respuestas, por favor espere mientras se verifica la transaccion.',
          icon: <SmileOutlined style={{ color: '#32a852' }} />,
        })
      }
    const coinScanner = async () => {
        const coin = await quizContract(user.wallet)
        if (coin === user.coin) coinScanner()
        else {
            user.setCoin(coin)
            user.resetRespuestas()
            router.push('/QuizHome')
        }
    }
    
    const submit = async (e: any) => {
        if( window.ethereum.chainId === '0x5' ){
            e.preventDefault()
            try {
                setLoading(true)
                const hash = await submitContract(Number(router.query.indice), getSnapshot(user.respuestas))
                openNotificationSuccess()
                checkTransactionconfirmation(hash).then(async (r: any) => {
                    await coinScanner()
                    user.resetRespuestas()
                })
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }else{
            openNotificationError()
            setLoading(false)
        }
    }

    return !(user.wallet === '') ? (
        <Spin spinning={loading} size={'large'}>
                  {contextHolder}
            <LayoutQuiz>
                <div style={{ paddingLeft: '20vw', paddingTop: '5vh' }} >
                    <Card title={'Respuestas'}
                        headStyle={{ backgroundColor: '#8292b3' }}
                        style={{ minWidth: '35vw', maxHeight: '50vh', maxWidth: '40vw' }}>
                        {
                            getSnapshot(user.respuestas).map((r, i) => <p key={i}>Respuesta {i + 1}: {r === 100000 ? 'Sin seleccionar' : r}</p>)
                        }
                    </Card>
                    <Button onClick={submit}>Enviar</Button>
                </div>
            </LayoutQuiz>
        </Spin>
    )
        : <Redirect to={'/'} />
}

export default QuizFinish