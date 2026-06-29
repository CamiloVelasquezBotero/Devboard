import mongoose, { Schema, Document } from 'mongoose'

export type UserType = Document & {
    email: string
    password: string
    name: string
    confirmed: string
}

const userSchema:Schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model<UserType>('User', userSchema)
export default User