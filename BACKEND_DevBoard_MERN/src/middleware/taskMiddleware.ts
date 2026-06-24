import type { Request, Response, NextFunction } from 'express'
import { TaskType } from '../models/Task'
import Task from '../models/Task'

/* With this, we can rewrite the global types of the Request of whatever we want */
declare global {
    namespace Express {
        /* As we can use the interface with the same name several times, then we're gonna use the interface to add
        the new type for express in the request */
        interface Request {
            task: TaskType
        }
    }
}

export async function taskExists(req: Request, res: Response, next: NextFunction) {
    const { taskId } = req.params
    try {
        const task = await Task.findById(taskId)
        if (!task) {
            const error = new Error('Task not found!')
            return res.status(404).json({ error: error.message })
        }

        /* If the task exists, then we pass the task in the Request to get it in the controller,
        and we have to rewrite the types of the Request with "declare global in line 5" */
        req.task = task
        next() /* If the task exists, then we pass to the next middleware or function */
    } catch (error) {
        res.status(500).json({ error: 'There was an error validating the task' })
    }
}

export function taskBelongToProject(req: Request, res: Response, next: NextFunction) {
    /* we're gonna check if the id of the project belongs to the task*/
    if (req.task.project.toString() !== req.project._id.toString()) {
        const error = new Error('action not permitted')
        return res.status(400).json({ error: error.message })
    }
    /* If the validation is correct, then we pass to the next middleware or function */
    next()
}