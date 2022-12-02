import { types, getSnapshot, Instance, cast } from "mobx-state-tree"
import { Question } from './Question'

export interface IQuiz extends Instance< typeof Quiz > {}
export interface IQuestion extends Instance <typeof Question> {}
export interface IRootStore extends Instance<typeof RootStore> {}

const Quiz = types.model({
    title: types.optional(types.string, ""),
    image: types.optional(types.string, ""),
    questions: types.optional( types.array(Question), [] )
})

export const RootStore = types.model({
    quiz: types.array(Quiz),            //se deja asi para que sea mas facil agregar en un futuro mas de una quiz diaria
}).actions( store => ({
    setQuizs( newQuiz: IQuiz ){
        if( store.quiz.filter( q => q.title === newQuiz.title ).length === 0 ){ //no agrega quiz repetidas
            store.quiz.push(newQuiz)
        } 
    },
    getSnapshotQuestions(){
        return store.quiz.map( q => q.questions )
    }
}) )
