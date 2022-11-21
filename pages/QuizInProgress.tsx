import React, { useEffect, useState } from 'react'
import LayoutQuiz from '../components/LayoutQuiz'
import { Card, Slider } from 'antd'
import { useStoreQuiz, useStoreUser } from '../store/store';
import { getSnapshot } from 'mobx-state-tree';
import { useRouter } from 'next/router';
const gridStyle: React.CSSProperties = {
    textAlign: 'center',
    cursor: 'pointer',
};

const QuizInProgress = () => {
    const router = useRouter()
    const quizStore = useStoreQuiz()
    const userStore = useStoreUser()
    const quizs = getSnapshot(quizStore.quiz)
    const [indiceOptions, setIndiceOptions] = useState<number>(0)
    const preguntas = quizs.map(q => q.questions)
    const indice = parseInt(router.query.indice as string)
    const [ respuestas, setRespuesta ] = useState<number[]>([])
    const [countDown, setCountDown] = useState<number>( preguntas[indice][indiceOptions].lifetimeSeconds )
    const [ redirect, setRedirect ] = useState<boolean>(false)
    useEffect(() => {
        const interval = setInterval(() => {
            if (countDown >= 0) setCountDown(countDown - 0.1);
            else nextQuestions(-1)
        }, 100);
        return () => clearInterval(interval);
    }, [countDown, setCountDown]);

    useEffect(() => setCountDown(preguntas[indice][indiceOptions].lifetimeSeconds), [indiceOptions])

    const nextQuestions = ( option : number ) => {
        if ((preguntas[indice].length - 1) > indiceOptions){
            setIndiceOptions(indiceOptions + 1)
            setRespuesta(respuestas.concat([option]))
            userStore.setRespuestas(option)
        }
        else{
            setRespuesta(respuestas.concat([option]))
            if(redirect === true) {
                console.log(respuestas)
                router.push({pathname:'/QuizFinish', query: { indice: router.query.indice }})
            }else {
                userStore.setRespuestas(option)
                setRedirect(true)
                setCountDown(0)
            }
        }            
    }

    return (
        <LayoutQuiz>
        <Slider style={{ paddingTop: '20px'  }} min={0} max={preguntas[indice][indiceOptions].lifetimeSeconds} step={0.01} value={countDown} />
            <div style={{ paddingLeft: '25vw', paddingTop: '5vh' }}>
                <Card
                    bordered={true}
                    headStyle={{ backgroundColor: '#8292b3' }}
                    style={{ maxWidth: '30vw', maxHeight: '30vh' }}
                    title={preguntas[indice][indiceOptions].text}
                    cover={
                        <img
                            alt="example"
                            src={preguntas[indice][indiceOptions].image}
                        />
                    }
                >
                    {
                        preguntas[indice][indiceOptions].options.map((options, i) =>
                            <Card.Grid onClick={() => nextQuestions(i)} key={i} style={gridStyle}>
                                {options.text}
                            </Card.Grid>
                        )
                    }
                </Card>
            </div>
        </LayoutQuiz>
    )
}

export default QuizInProgress