import { types, getSnapshot } from "mobx-state-tree"

export const QuestionOptions = types.model({
    text : types.optional( types.string, "" )
});