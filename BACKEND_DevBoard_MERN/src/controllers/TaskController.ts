import type { Request, Response } from 'express'
import Project from '../models/Project'
import Task from '../models/Task'

export class TaskController {

    static createTask = async (req: Request, res: Response) => {
        
        try {
            /* Create the new Task model */
            const task = new Task(req.body)
            /* we'll give the project id that belongs to the task, and we do the same for the project*/
            task.project = req.project._id
            req.project.tasks.push(task._id)

            /* Save the task and the project already edited with "Promise.allSettled" to save the two await at the same time */
            await Promise.allSettled([ task.save(), req.project.save() ])

            /* if all is correctly we'll send the message */
            res.status(201).send('Task Created Successfully')
        } catch (error) {
            res.status(500).json({ error: 'Error creating task' })
            console.error(error)
        }
    }

    static getProjectTasks = async (req:Request, res:Response) => {
        try {
            /* We're gonna get the tasks that have the id of the project that we got in the request, and additional of this
            we're gonna get the project this task belongs to with "populate" */
            const tasks = await Task.find({project: req.project._id}).populate('project')
            res.status(200).json(tasks)
        } catch (error) {
            res.status(500).json({ error: 'There was an error getting the tasks' })
            console.error(error)
        }
    }

    static getTaskById = async (req:Request, res:Response) => {
        try {
            /* Consult to send the task complete */
            const task = await Task.findById(req.task._id)
                .populate({ path: 'completedBy.user', select: 'id name email' })
                .populate({ path: 'notes', populate: {path: 'createdBy', select: 'id name email'} })
            
            res.status(200).json(task)
        } catch (error) {
            res.status(500).json({ error: 'There was an error getting the tasks' })
            console.error(error)
        }
    }

    static updateTask = async (req:Request, res:Response) => {
        try {
            /* Once we pass the validation we're gonna update the task */
            req.task.taskName = req.body.taskName
            req.task.description = req.body.description
            await req.task.save()

            res.status(200).send('Task updated correctly')
        } catch (error) {
            res.status(500).json({ error: 'There was an error getting the tasks' })
            console.error(error)
        }
    }

    static deleteTask = async (req:Request, res:Response) => {
        try {
            /* Once we pass the validation of the task then we're gonna delete it and the id of the project too */
            /* Delete the id task of the project belongs to */
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task._id.toString())

            /* Save the changes of the tasks and the project tasks */
            Promise.allSettled([ req.task.deleteOne(), req.project.save() ])

            res.status(200).send('Task deleted correctly')
        } catch (error) {
            res.status(500).json({ error: 'There was an error getting the tasks' })
            console.error(error)
        }
    }

    static updateTaskStatus = async (req:Request, res:Response) => {
        try {
            /* Update the status of the Task*/
            const { status } = req.body
            req.task.status = status

            // Updated By 
            const data = { user: req.user._id, status}

            // Update the status history
            req.task.completedBy.push(data)

            await req.task.save()
            res.status(200).send('Task status updated correctly')
        } catch (error) {
            res.status(500).json({ error: 'There was an error getting the tasks' })
            console.error(error)
        }
    }
}