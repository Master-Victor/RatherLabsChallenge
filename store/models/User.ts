import { types, Instance } from "mobx-state-tree";

export const User = types.model({
    wallet: types.optional(types.string, ""),
    respuestas: types.optional( types.array(types.number), [] )
}).actions( store => ({
    setWallet( wallet: string ){
        store.wallet = wallet
    },
    setRespuestas( respuesta : number ){
        store.respuestas.push(respuesta) 
    }
}) )

export interface IUserStore extends Instance<typeof User> {}
