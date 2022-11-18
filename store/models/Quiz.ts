import { types, getSnapshot, Instance, cast } from "mobx-state-tree";
import { Question } from './Question';

export interface IQuiz extends Instance< typeof Quiz > {}
export interface IQuestion extends Instance <typeof Question> {}
export interface IRootStore extends Instance<typeof RootStore> {}

const Quiz = types.model({
    title: types.optional(types.string, ""),
    image: types.optional(types.string, ""),
    questions: types.optional( types.array(Question), [] )
})

export const RootStore = types.model({
    quiz: types.array(Quiz),
}).actions( store => ({
    setQuizs( newQuiz: IQuiz ){
        store.quiz.push( newQuiz )
    },
    getSnapshotQuestions(){
        return store.quiz.map( q => q.questions )
    }
}) )

// export const store = RootStore.create({
//     Quiz: {} // users is required here because it's not marked as optional
// });