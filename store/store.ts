import { RootStore, IRootStore } from './models/Quiz'

let _StoreQuiz: IRootStore

export const useStoreQuiz = () => {
    if( !_StoreQuiz )
        _StoreQuiz = RootStore.create({
            quiz: []
        })

    return _StoreQuiz
}