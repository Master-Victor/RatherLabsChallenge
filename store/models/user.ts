import { types, getSnapshot } from "mobx-state-tree";

export const Todo = types.model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false)
});

export const User = types.model({
    name: types.optional(types.string, "")
});

