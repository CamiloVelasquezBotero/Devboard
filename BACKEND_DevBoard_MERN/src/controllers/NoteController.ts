import { Request, Response } from "express";
import Note, { INote } from "../models/Note";
import { Types } from "mongoose";

type NoteParams = {
    noteId: Types.ObjectId
}

export class NoteController {
    static createNote = async (req:Request<{}, {}, INote>, res:Response) => {
        try {
            const { content } = req.body
            const note = new Note()
            
            // fill the field of the note
            note.content = content
            note.createdBy = req.user._id
            note.task = req.task._id
    
            // Add to the task
            req.task.notes.push(note._id)
            
            // Save The note and and the task modified
            await Promise.all([note.save(), req.task.save()])
            res.status(200).send('Note created successfully')
        } catch (error) {
            res.status(500).json({error: 'There was an error creating the note'})           
            console.error(`There was an error creating the note: ${error}`)
        }
    }

    static getTaskNotes = async (req:Request<{}, {}, INote>, res:Response) => {
        try {
            const notes = await Note.find({task: req.task._id})
            res.status(200).json(notes)
        } catch (error) {
            res.status(500).json({error: 'There was an error getting the notes'})           
            console.error(`There was an error getting the notes: ${error}`)
        }
    }

    static deleteNote = async (req:Request<NoteParams>, res:Response) => {
        const { noteId } = req.params

        const note = await Note.findById(noteId)
        // Check if the note exists
        if(!note) {
            const error = new Error('Note not found')
            return res.status(404).json({error: error.message})
        }
        // Is the request user is the creator?
        if(note.createdBy.toString() !== req.user._id.toString()) {
            const error = new Error('Unauthorized')
            return res.status(404).json({error: error.message})
        }

        // Delete note from the taks
        req.task.notes = req.task.notes.filter(note => note._id.toString() !== noteId.toString())

        try {
                // Delete the note and save the chancges in the task
                await Promise.allSettled([note.deleteOne(), req.task.save()])
                res.status(200).send('Note deleted successfully')
        } catch (error) {
            res.status(500).json({error: 'There was an error deleting the note'})           
            console.error(`There was an error deleting the note: ${error}`)
        }
    }
    
}