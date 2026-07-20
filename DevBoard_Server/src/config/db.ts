import mongoose from "mongoose";
import colors from 'colors'
import { setDefaultResultOrder, setServers } from 'node:dns'

// Bug Fixed, When MongoDB is connecting from Windows with the Node 17+ it doesn't work well with the IPv6. So, to solve it, 
// we set the IPv4 first and use Google's DNS servers.
setDefaultResultOrder('ipv4first')
setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL!)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.cyan.bold(`MongoDB conectado en: ${url}`))
    } catch (error) {
        /* console.log(error.message) */
        console.log(colors.red.bold("Error to connect to MongoDB:"), error)
        process.exit(1) /* o import { exit } from 'node:process'; */
    }
}