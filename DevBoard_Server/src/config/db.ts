import mongoose from "mongoose";
import colors from 'colors'
import { setDefaultResultOrder } from 'node:dns'

// Error to connect to mongoose with dns fixed 
setDefaultResultOrder('ipv4first')

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.cyan.bold(`MongoDB conectado en: ${url}`))
    } catch (error) {
        /* console.log(error.message) */
        console.log(colors.red.bold("Error to connect to MongoDB:"), error)
        process.exit(1) /* o import { exit } from 'node:process'; */
    }
}