import { RootStore, IRootStore } from './models/Quiz'
import { User, IUserStore } from './models/User'

let _StoreQuiz: IRootStore
let _StoreUser: IUserStore

export const useStoreQuiz = () => {
    if( !_StoreQuiz )
        _StoreQuiz = RootStore.create({
            quiz: []
        })

    return _StoreQuiz
}

export const useStoreUser = () => {
    if( !(_StoreUser) )
        _StoreUser = User.create({
            wallet: '',
            coin: -1,
            respuestas: []
        })
    return _StoreUser
}