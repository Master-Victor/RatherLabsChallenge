import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect } from 'react'
import LayoutQuiz from '../components/LayoutQuiz'
import { Layout, Row, Col, Input, Slider, Button, Card } from 'antd';
const { Header, Footer, Content } = Layout;
import { useStoreQuiz } from '../store/store'
import { getSnapshot } from 'mobx-state-tree';
import Image from 'next/image'

const gridStyle: React.CSSProperties = {
    textAlign: 'center',
    cursor: 'pointer'
};

const QuizHome = () => {

    useLayoutEffect(() => {
        const get = async () => {
            const res = await fetch(`http://localhost:3000/api/quizs`)
            const quizs = await res.json()
            const quizStore = useStoreQuiz();
            quizStore.setQuizs(quizs)
        }
        get()
    }, [])

    const router = useRouter()
    const quizStore = useStoreQuiz();
    const quizs = getSnapshot(quizStore.quiz)

    const redirect = (i : number) => router.push({ pathname: 'QuizInProgress', query: { indice: i.toString()} })

    return (
        <LayoutQuiz>
            <div style={{ paddingLeft: '10vw', paddingTop: '10vh' }}>
                <Card bordered={true} title={'daily quiz'} style={{ width: '60vw', height: '30vh' }} headStyle={{ backgroundColor: '#8292b3' }}>
                    {
                        quizs
                            ? quizs.map((q, i) => <Card.Grid key={i} style={gridStyle} onClick={ () => redirect(i) }>
                                <Image
                                    src={ q.image }
                                    alt=""
                                    width={20}
                                    height={20}
                                /> {q.title}</Card.Grid>)
                            : <Card.Grid style={gridStyle}>cargando ...</Card.Grid>
                    }
                </Card>
            </div>
        </LayoutQuiz>
    )
}

export default QuizHome