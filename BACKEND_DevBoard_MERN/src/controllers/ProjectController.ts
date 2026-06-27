import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {

    static createProject = async (req:Request, res:Response) => {
        const project = new Project(req.body) /* create the new project with the model that we created in mongoDB and pass the req.body values */

        try {
            /* await Project,create(req.body)  // De esta forma tambien lo podemos crear directamente*/
            await project.save() /* Save the project with mongoose */
            res.status(201).json({message: 'Project Created successfully'})
        } catch (error) {
            console.log(`There was an error creating the project: ${error}`)
        }
    }

    static getAllProjects = async (req:Request, res:Response) => {
        try {
            const projects = await Project.find()
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

            /* Send the project found */
            res.status(200).json(project)
        } catch (error) {
            console.log(`There was an error getting the project: ${error}`)
        }
    }

    static updateProject = async (req:Request, res:Response) => {
        const { id } = req.params
        
        try {
            /* as we already know that the validation pass it then we can update it directly */
            const project = await Project.findById(id)
            if(!project) {
                const error = new Error('¡Project not found!')
                return res.status(404).json({ error: error.message })
            }

            /* Update the Values of the project */
            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description
            /* Save the project */
            await project.save()
            res.status(200).send('Proyect Updated')
        } catch (error) {
            console.log(`There was an error updating the project: ${error}`)
        }
    }

    static deleteProject = async (req:Request, res:Response) => {
        const { id } = req.params
        
        try {
            /* as we already know that the validation pass it then we can update it directly */
            /* const project = await Project.findByIdAndDelete(id) //we can do this but is better confirm that the user wants to delete it */
            const project = await Project.findById(id)
            /* check if the user has the privileges and the project exists*/
            if(!project) {
                const error = new Error('¡Project not found!')
                return res.status(404).json({ error: error.message })
            }

            await project.deleteOne()
            res.status(200).send('Proyect Deleted')
        } catch (error) {
            console.log(`There was an error deleting the project: ${error}`)
        }
    }
} 