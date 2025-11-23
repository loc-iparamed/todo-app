import Task from "../models/Task.js";


export const getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    try {
        const {title} = req.body;
        const task = new Task({ title });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Lỗi khi tạo task:", error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
   try{
    const { title, status, completeAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { title, status, completeAt },
        { new: true }
    );
    if(!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
}