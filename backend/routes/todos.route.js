import { Router } from "express";
import userAuth from "../middlewares/auth.middleware.js";
import { createTodoController, deleteTodoController, getAllTodoController, updateTodoController } from "../controller/todos.controller.js";

const router = Router();

router.post("/create",userAuth,createTodoController);
router.get("/get",userAuth,getAllTodoController);
router.put("/update/:todo_id",userAuth,updateTodoController)
router.delete("/delete/:todo_id",userAuth,deleteTodoController)
export default router