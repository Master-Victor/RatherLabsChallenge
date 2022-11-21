import { getSnapshot } from 'mobx-state-tree'
import React from 'react'
import { useStoreUser } from '../store/store'
const QuizFinish = () => {
    const user = useStoreUser()
    console.log(getSnapshot(user))
    return (
        <button onClick={ () => user.setRespuestas(1) }>QuizFinish</button>
    )
}

export default QuizFinish