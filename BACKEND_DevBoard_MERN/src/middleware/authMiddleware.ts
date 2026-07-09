import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import User from "../models/User"
import type { UserType } from "../models/User"

declare global {
    namespace Express {
        interface Request {
            user?: UserType
        }
    }
}
 
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization
    if (!bearer) {
        const error = new Error('Unauthorized')
        return res.status(401).json({ error: error.message })
    }

    // Get the token
    const token = bearer.split(' ')[1]

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //Verify if the user exists
        if (typeof decoded === 'object' && decoded.id) {
            const user = await User.findById(decoded.id).select('_id name email')
            if (user) {
                // Send the user in the request to the next middleware
                req.user = user
            } else {
                res.status(500).json({ error: 'Invalid Token' })
            }
        }

        next()
    } catch (error) {
        res.status(500).json({ error: 'Invalid Token' })
    }

}