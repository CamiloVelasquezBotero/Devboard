import mongoose, { Schema, Document, PopulatedDoc, Types } from 'mongoose' /* We import the mongoose ODM and the types */
import { TaskType } from './Task'

/* Create the type of the model passing it throgh the generic type */
export type ProjectType = Document & {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<TaskType & Document>[] /* it will be many then we pass it like an array */
}

/* Create the Schema */
const ProjectSchema:Schema = new Schema({
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
    ]
}, {timestamps: true})

/* Create the Model and export it*/
const Project = mongoose.model<ProjectType>('Project', ProjectSchema)
export default Project