import { createContext } from "react";

export const TodoContext = createContext({
    todos: [],
    loading: false,
    createModal: false,
    setLoading: () => { },
    setCreateModal: () => { },
    setTodos: () => { },
    fetchTodos: () => { },
    createTodo: () => { },
    editTodo: () => { },
    deleteTodo: () => { }
})