import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors = (req:Request, res:Response, next:NextFunction) => {
    /* Tje "validationResult runs automatically when we pass it the request, and got the errors from the request in "withMessage()""  */
    let errors = validationResult(req) 
    if(!errors.isEmpty()) {
        /* if we got any error, we pass it with the status code 400 and pass a json with the errors converted to array */
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}