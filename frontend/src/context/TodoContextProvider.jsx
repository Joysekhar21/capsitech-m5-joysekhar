import React, { useContext, useState } from 'react'
import { TodoContext } from './TodoContext'
import toast from 'react-hot-toast'
import { BASE_URL } from '../utils/constant';

const TodoContextProvider = (props) => {
    const [todos, setTodos] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchTodos = async()=>{
        if(!localStorage.getItem("todo-accessToken")){
            return;
        }
        setLoading(true);
        await fetch(`${BASE_URL}/api/v1/todo/get`,{
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
            }
        })
        .then((parsed)=>parsed.json())
        .then((res)=>{
            if(res.success){
                setTodos(res.todos);
                
            }
            if(!res.success){
                toast.success(res.message)
            }
        })
        .catch((err)=>{
            console.log(err);
            toast.error("Something went wrong!")
        });
        setLoading(false);
    }

    const editTodo = ({
         title,
        content,
        completed,
        _id})=>{
            if (!localStorage.getItem("todo-accessToken")) {
                return;
              }
            if (!_id || !(title || content || completed)) return;
            const toastLoading = toast.loading("Please wait...");
            fetch(`${BASE_URL}/api/v1/todo/update/${_id}`, {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
              },
              body: JSON.stringify({
                content,
                title,
                completed,
              }),
            })
            .then((parsed)=> parsed.json())
            .then((res)=>{
                if(res.success){
                    setTodos((todos)=>
                        todos.map((prevTodo)=>{
                            if(prevTodo._id.toString()=== _id.toString()){
                                prevTodo = res.todo;
                            }
                            return prevTodo;
                        })
                    );
                    toast.success(
                        completed.length? `Task marked as ${completed}` : "Task updated",
                        {
                            id: toastLoading,
                        }
                    )
                }
                if(!res.success){
                    toast.error(res.message,{
                        id: toastLoading,
                    });
                }
            })
            .catch((err)=>{
                toast.error("Something went wrong! ",{
                    id: toastLoading,
                });
                console.log(err);
            })
    }

    const createTodo = (newTodo) => {
        if (!localStorage.getItem("todo-accessToken")) {
          return;
        }
        if (!newTodo.title || !newTodo.content) {
          return;
        }
        const toastLoading = toast.loading("Please wait...");
        fetch(`${BASE_URL}/api/v1/todo/create`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
          },
          body: JSON.stringify({
            content: newTodo.content,
            title: newTodo.title,
            completed: newTodo.completed,
          }),
        })
          .then((parsed) => parsed.json())
          .then((res) => {
            console.log(res.success);
            if (res.success) {
                console.log(res)
              setTodos([...todos, res.todo]);
              console.log(todos.completed)
              toast.success("Task added", {
                id: toastLoading,
              });
              setCreateModal(false);
            }
            if (!res.success) {
              toast.error(res.message, {
                id: toastLoading,
              });
            }
          })
          .catch((err) => {
            toast.error("Something went wrong!", {
              id: toastLoading,
            });
            console.log(err);
          });
      };
    
      const deleteTodo = (todo_id) => {
        if (!localStorage.getItem("todo-accessToken")) {
          return;
        }
        if (!todo_id) return;
        const toastLoading = toast.loading("Please wait...");
        fetch(`${BASE_URL}/api/v1/todo/delete/${todo_id}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("todo-accessToken")}`,
          },
        })
          .then((parsed) => parsed.json())
          .then((res) => {
            if (res.success) {
              setTodos((todos) => todos.filter((todo) => todo._id !== todo_id));
              toast.success("Task deleted", {
                id: toastLoading,
              });
            }
            if (!res.success) {
              toast.error(res.message, {
                id: toastLoading,
              });
            }
          })
          .catch((err) => {
            toast.error("Something went wrong!", {
              id: toastLoading,
            });
            console.log(err);
          });
      };
  return (
    <TodoContext.Provider
        value={{
            todos,
            setTodos,
            fetchTodos,
            createTodo,
            editTodo,
            deleteTodo,
            createModal,
            loading,
            setCreateModal,
            setLoading,
        }}
    >
        {props.children}
    </TodoContext.Provider>
  )
}

export default TodoContextProvider


export const useTodo = ()=>{
    return useContext(TodoContext)
}
