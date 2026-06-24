import type { Request, Response, NextFunction } from 'express'
import Project, { ProjectType } from '../models/Project'

/* With this, we can rewrite the global types of the Request of whatever we want */
declare global {
    namespace Express {
        /* As we can use the interface with the same name several times, then we're gonna use the interface to add
        the new type for express in the request */
        interface Request {
            project: ProjectType
        }
    }
}

export async function ProjectExists(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params
    try {
        const project = await Project.findById(projectId)
        if (!project) {
            const error = new Error('¡Project not found!')
            return res.status(404).json({ error: error.message })
        }
        
        /* If the project exists, then we pass the project in the Request to get it in the controller,
        and we have to rewrite the types of the Request with "declare global in line 5" */
        req.project = project
        next() /* If the project exists, then we pass to the next middleware or function */
    } catch (error) {
        res.status(500).json({ error: 'There was an error validating the project' })
    }
}