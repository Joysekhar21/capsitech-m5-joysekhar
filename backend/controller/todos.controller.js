import { Todo } from "../models/todo.model.js"

const createTodoController = async(req,res)=>{
try {
        const {title,content} = req.body
    
        if(req.user == undefined){
            return res.status(400).json({
                message: "Token Not found"
            })
        }
    
        const {_id} = req.user
    
        if(!title || !content){
            return res.status(400).json({message: "Title and Content are Required"})
        }
        const todo = await Todo.create({
            title,
            content,
            user: _id
        })
        
        if(!todo){
            return res.status(500).json({message:"Something went wrong, while creating todo"})
        }

        return res.status(200).json({
            success: true,
            todo,
            message: "Todo Created Successfully"
        })

} catch (error) {
    console.log("Error in todo creation",error);
    res.status(500).json({message: "Internal Server Error on todo creation", error});
    }
}

const getAllTodoController = async(req,res)=>{
    try {
        if(req.user == undefined){
            return res.status(400).json({message: "Token not Found"})
        }

        const {_id} = req.user

        const todos = await Todo.find({user: _id})

        return res.status(200).json({
            success: true,
            todos,
            message: "Todos Found"
        })

    } catch (error) {
        console.log("Error in get all todos",error);
        res.status(500).json({message: "Internal Server Error on get all todos", error});   
    }
}

const updateTodoController = async (req,res)=>{
    try {
        if(req.user == undefined){
            return res.status(400).json({
                message: "Token not found"
            })
        }
        const { content,title,completed } = req.body
        const {todo_id} = req.params
        const {_id} = req.user

        if(!(content || title || completed) || !todo_id){
            return res.status(400).json({
                message: "todo_id / content / title / completed is required"
            })
        }

        const todo = await Todo.findById(todo_id)
        if(!todo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }

        if(todo.user.toString()!== _id.toString()){
            return res.status(401).json({
                message: "Unauthorized request"
            })
        }

        if(content) todo.content = content
        if(title) todo.title = title
        if(completed){
            if(completed === "complete") todo.completed = true
            if(completed === "incomplete") todo.completed = false
        }

        await todo.save()

        return res.status(200).json({
            success: true,
            todo,
            message: "Todo Updated Successfully"
        })

    } catch (error) {
        console.log("Error in update todo",error);
        res.status(500).json({message: "Internal Server Error on update todo", error});   
    }
}

const deleteTodoController = async(req,res) =>{
try {
        if(req.user == undefined){
            return res.status(400).json({
                message: "Token not found"
            })
        }
    
        const {todo_id} = req.params
        const {_id} = req.user
    
        if(!todo_id){
            return res.status(400).json({
                message:"todo_id is required"
            })
        }
    
        const todo = await Todo.findById(todo_id)
        if(!todo){
            return res.status(404).json({
                message: "Todo not Found"
            })
        }
    
        if(todo.user.toString()!==_id.toString()){
            return res.status(400).json({
                message: "Unauthorized request"
            })
        }
    
        await Todo.findByIdAndDelete(todo_id)
    
        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        })
} catch (error) {
    console.log("Error in update todo",error);
    res.status(500).json({message: "Internal Server Error on update todo", error});  
}
}

export {
    createTodoController,
    getAllTodoController,
    updateTodoController,
    deleteTodoController
}