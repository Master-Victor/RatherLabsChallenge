import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect } from 'react'
import LayoutQuiz from '../components/LayoutQuiz'
import { Card } from 'antd'
import { useStoreQuiz } from '../store/store'
import { getSnapshot } from 'mobx-state-tree'
import Image from 'next/image'
const { Meta } = Card

const gridStyle: React.CSSProperties = {
    textAlign: 'center',
    cursor: 'pointer',
    width: '100%',
}

const QuizHome = () => {

    const router = useRouter()
    const quizStore = useStoreQuiz()
    const quizs = getSnapshot(quizStore.quiz)

    const redirect = (i: number) => router.push({ pathname: 'QuizInProgress', query: { indice: i.toString() } })

    return (
        <LayoutQuiz>
            <div style={{ paddingLeft: '30vw', paddingTop: '10vh' }}>
                <Card bordered={true} title={quizs[0].title} style={{ width: '20vw', height: '30vh' }} headStyle={{ backgroundColor: '#8292b3' }}
                    cover={
                        <img
                            alt="example"
                            src={quizs[0].image}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null
                                currentTarget.src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                              }}
                              style={{maxWidth: '20vw'}}
                        />
                    }
                >
                <Card.Grid key={0} style={gridStyle} onClick={() => redirect(0)}>
                 Iniciar encuesta
                 </Card.Grid>
                </Card>
            </div>
        </LayoutQuiz >
    )
}

export default QuizHome