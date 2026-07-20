import mongoose, { Schema, Document, Types } from 'mongoose' /* We import the mongoose ODM and the types */
import Note from './Note'

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const /* with this form it will be "readonly" */

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

/* Create the type of the model passing it throgh the generic type */
export type TaskType = Document & {
    taskName: string
    description: string
    project: Types.ObjectId
    status: TaskStatus
    completedBy: {
        user: Types.ObjectId
        status: TaskStatus
    }[]
    notes: Types.ObjectId[]
}

/* Create the Schema */
const TaskSchema: Schema = new Schema({
    taskName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: Object.values(taskStatus), /* with "enum" we pass the array of the values that this status it will have */
        default: taskStatus.PENDING
    },
    completedBy: [
        {
            user: {
                type: Types.ObjectId,
                ref: 'User',
                default: null
            },
            status: {
                type: String,
                enum: Object.values(taskStatus), /* with "enum" we pass the array of the values that this status it will have */
                default: taskStatus.PENDING
            }
        }
    ],
    notes: [
        {
            type: Types.ObjectId,
            ref: 'Note'
        }
    ]
}, { timestamps: true })

// Middleware of mongoose to delete notes when remove a task
TaskSchema.pre('deleteOne', {document: true}, async function() {
    // Get the task id of the task deleted
    const taskId = this._id
    if(!taskId) return

    // Delete the all notes what has the taskId of the task deleted
    await Note.deleteMany({ task: taskId })
})

/* Create the Model and export it*/
const Task = mongoose.model<TaskType>('Task', TaskSchema)
export default Task