import { useRouter } from 'next/router'
import React from 'react'
import LayoutQuiz from '../components/LayoutQuiz'
import { Layout, Row, Col, Input, Slider, Button, Card } from 'antd';
const { Header, Footer, Content } = Layout;

const gridStyle: React.CSSProperties = {

    textAlign: 'center',
  };

const QuizHome = () => {
    const router = useRouter()
    return (
        <LayoutQuiz>
            <div style={{ paddingLeft: '10vw', paddingTop: '10vh' }}>
                <Card title={'title quiz'} style={{ width: '60vw', height: '50vh' }}>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                </Card>
            </div>
        </LayoutQuiz>
    )
}

export default QuizHome