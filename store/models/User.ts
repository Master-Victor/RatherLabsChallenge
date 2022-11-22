import { types, Instance } from "mobx-state-tree"

export const User = types.model({
    wallet: types.optional(types.string, ""),
    coin: types.optional(types.number, 0),
    respuestas: types.optional( types.array(types.number), [] )
}).actions( store => ({
    setWallet( wallet: string ){
        store.wallet = wallet
    },
    setRespuestas( respuesta : number ){
        store.respuestas.push(respuesta) 
    },
    setCoin( coin : number ){
        store.coin = coin
    },
    resetRespuestas(){
        store.respuestas.length = 0
    }

}) )

export interface IUserStore extends Instance<typeof User> {}
