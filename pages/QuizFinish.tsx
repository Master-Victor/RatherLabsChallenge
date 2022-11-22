import { getSnapshot } from 'mobx-state-tree'
import React, { useState } from 'react'
import { useStoreUser } from '../store/store'
import LayoutQuiz from '../components/LayoutQuiz'
import { Button, Card, Spin } from 'antd'
import { submitContract, checkTransactionconfirmation, quizContract } from '../contract/functions'
import { useRouter } from 'next/router'
import Redirect from '../components/Redirect'

const QuizFinish = () => {
    const user = useStoreUser()
    const router = useRouter()
    const [ loading, setLoading ] = useState<boolean>(false)

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
        e.preventDefault()
        try {
            setLoading(true)
            const hash = await submitContract(Number(router.query.indice), getSnapshot(user.respuestas))
            checkTransactionconfirmation(hash).then(async (r: any) => {
                await coinScanner()
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return !(user.respuestas.length === 0) ? (
        <Spin spinning={loading} size={'large'}>
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