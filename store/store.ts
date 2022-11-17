import { types, getSnapshot } from "mobx-state-tree"
import { User, Todo } from './models/user'

const RootStore = types.model({
    users: types.map(User),
    todos: types.optional(types.map(Todo), {})
});

export const store = RootStore.create({
    users: {} // users is required here because it's not marked as optional
});