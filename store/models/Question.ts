import { types, getSnapshot } from "mobx-state-tree"
import { QuestionOptions } from './QuestionOptions'

export const Question = types.model({
    text : types.optional( types.string, "" ),
    image: types.optional( types.string, "" ),
    lifetimeSeconds: types.optional( types.number, 0 ),
    options: types.optional( types.array( QuestionOptions ), [] )
});
