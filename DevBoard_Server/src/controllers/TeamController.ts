import { Request, Response } from "express"
import User from "../models/User"
import Project from "../models/Project"

export class TeamMemberController {
    
    static findMemberByEmail = async (req:Request, res:Response) => {
        const { email } = req.body

        try {
            // Find User
            const user = await User.findOne({email}).select('id email name')
            if(!user) {
                const error = new Error('User not found')
                return res.status(404).json({error: error.message})
            }

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({error: 'There was an error finding the team member'})
            console.error(error)
        }
    }

    static getProjectTeam = async (req:Request, res:Response) => {
        try {
            const project = await Project.findById(req.project._id).populate({
                path: 'team',
                select: 'id name email'
            })

            res.status(200).json(project.team)
        } catch (error) {
            
        }

        res.send('from getprojectteam')
    }

    static addMemberById = async (req:Request, res:Response) => {
        const { id } = req.body

        try {
            // Find User
            const user = await User.findById(id).select('id')
            if(!user) {
                const error = new Error('User not found')
                return res.status(404).json({error: error.message})
            }
            // Check if the user already exists in the project
            if(req.project.team.some(team => team.toString() === user._id.toString())) {
                const error = new Error('The user already exists in the project')
                return res.status(404).json({error: error.message})
            }

            // Add user to the project and save
            req.project.team.push(user._id)
            await req.project.save()

            res.status(200).send('¡User added successfully!')
        } catch (error) {
            res.status(500).json({error: 'There was an error adding the team member'})
            console.error(`There was an error adding the member: ${error}`)
        }
    }

    static removeMemberById = async (req:Request, res:Response) => {
        const { userId } = req.params

        try {
            // Check the project to known if the user exists
            if(!req.project.team.some(team => team.toString() === userId)) {
                const error = new Error("The user doesn't exists in the project")
                return res.status(404).json({error: error.message})
            }

            req.project.team = req.project.team.filter(teamMember => teamMember.toString() !== userId)

            await req.project.save()

            res.status(200).send('Member removed successfully')
        } catch (error) {
            res.status(500).json({error: 'There was an error removing the user of the team'})
            console.error(`There was an error removing the user of the team: ${error}`)
        }
    }
}