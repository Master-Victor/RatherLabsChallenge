import { useRouter } from 'next/router'
import React from 'react'
import LayoutQuiz from '../components/LayoutQuiz'
const QuizHome = () => {
    const router = useRouter()
    console.log(router.query)
    return (
        <LayoutQuiz>
            QuizHome
        </LayoutQuiz>
    )
}

export default QuizHome