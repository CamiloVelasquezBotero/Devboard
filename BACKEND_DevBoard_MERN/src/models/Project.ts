import mongoose, { Schema, Document, PopulatedDoc, Types } from 'mongoose' /* We import the mongoose ODM and the types */
import Task, { TaskType } from './Task'
import { UserType } from './User'
import Note from './Note'

/* Create the type of the model passing it throgh the generic type */
export type ProjectType = Document & {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<TaskType & Document>[] /* it will be many then we pass it like an array */
    manager: PopulatedDoc<UserType & Document>
    team: PopulatedDoc<UserType & Document>[]
}

/* Create the Schema */
const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task' /* the reference of the another model */
        }
    ],
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    },
    team: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true })

// Middleware that executes when we do this action "deleteOne"
ProjectSchema.pre('deleteOne', {document: true}, async function() {
    const projectId = this._id
    if(!projectId) return

    // Also delete all the notes of the task  because the middleware of the "Task" only read "deleteOne"
    const tasks = await Task.find({project: projectId})
    for(const task of tasks) {
        await Note.deleteMany({task: task._id})
    }

    // Delete all the tasks that has the id of the project
    await Task.deleteMany({project: projectId})
})

/* Create the Model and export it*/
const Project = mongoose.model<ProjectType>('Project', ProjectSchema)
export default Project