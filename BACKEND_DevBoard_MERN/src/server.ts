import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import { connectDB } from './config/db'
import projectRoutes from './routes/projectRoutes'

dotenv.config()

connectDB()

const app = express()

/* Loggin, we used morgan to be able to monitor the requests */
app.use(morgan('dev'))

/* So we can use CORS, we need to import the corsconfig that we created and, use the cors in the instance of express created "app" */
app.use(cors(corsConfig))

// Enabling JSON reading in Express to read form data
app.use(express.json())

// Routes
app.use('/api/projects', projectRoutes)

export default app