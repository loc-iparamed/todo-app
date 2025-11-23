import express from 'express';
import { getAllTasks, deleteTask, updateTask, createTask } from '../controllers/taskControllers.js';

const router = express.Router();

router.get("/", getAllTasks);
 

router.post("/", createTask);

router.delete("/:id", deleteTask);

router.put("/:id", updateTask);


export default router;