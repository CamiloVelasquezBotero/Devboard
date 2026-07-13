import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {

    static createProject = async (req:Request, res:Response) => {
        try {
            const project = new Project(req.body) /* create the new project with the model that we created in mongoDB and pass the req.body values */
            
            // Assing a manager to the project
            project.manager = req.user._id

            /* await Project,create(req.body)  // De esta forma tambien lo podemos crear directamente*/
            await project.save() /* Save the project with mongoose */
            res.status(201).json({message: 'Project Created successfully'})
        } catch (error) {
            console.log(`There was an error creating the project: ${error}`)
        }
    }

    static getAllProjects = async (req:Request, res:Response) => {
        try {
            const projects = await Project.find({
                $or: [
                    { manager: {$in: req.user._id} },
                    { team: req.user._id }
                ]
            })
            res.status(200).json(projects)
        } catch (error) {
            console.log(`There was an error getting the projects: ${error}`)
        }
    }

    static getProjectById = async (req:Request, res:Response) => {
        const { id } = req.params

        try {
            const project = await Project.findById(id).populate('tasks')
            if(!project) {
                const error = new Error('¡Project not found!')
                return res.status(404).json({ error: error.message }) 
            }

            // Verify if the user is the manager of the project
            if(project.manager.toString() !== req.user._id.toString() && !project.team.includes(req.user._id)) {
                const error = new Error('¡Unauthorized!')
                return res.status(404).json({ error: error.message }) 
            }

            /* Send the project found */
            res.status(200).json(project)
        } catch (error) {
            console.log(`There was an error getting the project: ${error}`)
        }
    }

    static updateProject = async (req:Request, res:Response) => {
        try {
            /* Update the Values of the project */
            req.project.projectName = req.body.projectName
            req.project.clientName = req.body.clientName
            req.project.description = req.body.description
            /* Save the project */
            await req.project.save()
            res.status(200).send('Proyect Updated')
        } catch (error) {
            console.log(`There was an error updating the project: ${error}`)
        }
    }

    static deleteProject = async (req:Request, res:Response) => {
        try {
            await req.project.deleteOne()
            res.status(200).send('Proyect Deleted')
        } catch (error) {
            console.log(`There was an error deleting the project: ${error}`)
        }
    }
} 