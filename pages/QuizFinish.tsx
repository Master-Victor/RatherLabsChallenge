import { getSnapshot } from 'mobx-state-tree'
import React from 'react'
import { useStoreUser } from '../store/store'
import LayoutQuiz from '../components/LayoutQuiz'
import { Button, Card } from 'antd'
import { submitContract, checkTransactionconfirmation, quizContract } from '../contract/functions'
import { useRouter } from 'next/router'

const QuizFinish = () => {
    const user = useStoreUser()
    const router = useRouter()
    const coinScanner = async() => {
        const coin = await quizContract(user.wallet)
        if( coin === user.coin ) coinScanner()
        else {
            user.setCoin(coin)
            router.push('QuizHome')
        }
        console.log(coin)
    }
    const submit = async(e : any) => {
        e.preventDefault()
        try {
            const hash = await submitContract(Number(router.query.indice), getSnapshot(user.respuestas))
            checkTransactionconfirmation(hash).then( async(r : any ) => {
                await coinScanner()
                console.log(r)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <LayoutQuiz>
            <div style={{ paddingLeft: '25vw', paddingTop: '5vh' }} >
                <Card title={'Respuestas'}
                    headStyle={{ backgroundColor: '#8292b3' }}
                    style={{ maxWidth: '30vw', maxHeight: '50vh' }}>
                        {
                            getSnapshot(user.respuestas).map( (r, i) => <p key={i}>Respuesta {i + 1}: opcion {r}</p> )
                        }
                </Card>
                <Button onClick={ submit }>Enviar</Button>
            </div>
        </LayoutQuiz>
    )
}

export default QuizFinish