import { useRouter } from 'next/router'
import React from 'react'
import LayoutQuiz from '../components/LayoutQuiz'
import { Card } from 'antd'
import { useStoreQuiz } from '../store/store'
import { getSnapshot } from 'mobx-state-tree'
import Redirect from '../components/Redirect'

const gridStyle: React.CSSProperties = {
    textAlign: 'center',
    cursor: 'pointer',
    width: '100%',
}

const QuizHome = () => {

    const router = useRouter()
    const quizStore = useStoreQuiz()
    const quizs = getSnapshot(quizStore.quiz)
    const redirect = (i: number) => router.push({ pathname: '/QuizInProgress', query: { indice: i.toString() } })

    return !(quizs.length === 0) ? (
        <LayoutQuiz>
            <div style={{ paddingLeft: '30vw', paddingTop: '10vh' }}>
                {quizs.map((quiz, i) =>
                    <Card key={i} bordered={true} title={quiz.title} style={{ width: '20vw', minHeight: '200px' }} headStyle={{ backgroundColor: '#8292b3' }}
                        cover={
                            <img
                                alt="example"
                                src={quiz.image}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null
                                    currentTarget.src = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                }}
                                style={{ maxWidth: '20vw' }}
                            />
                        }
                    >
                        <Card.Grid style={gridStyle} onClick={() => redirect(0)}>
                            Iniciar encuesta
                        </Card.Grid>
                    </Card>)
                }
            </div>
        </LayoutQuiz >
    )
        : <Redirect to="/" />
}

export default QuizHome