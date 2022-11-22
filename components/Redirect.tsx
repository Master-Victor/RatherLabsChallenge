import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStoreQuiz, useStoreUser } from '../store/store'
import { getSnapshot } from 'mobx-state-tree'

const Redirect = ( { to } : any ) => {

    const quizStore = useStoreQuiz()
    const user = useStoreUser()
    const router = useRouter()
    const quizs = getSnapshot(quizStore.quiz)

    useEffect( () => {

        if( quizs.length === 0 || user.wallet === '' ){
            router.push(String(to))
        }

    },[quizs, user] )

    return (
        <div>Redirect...</div>
    )
}

export default Redirect