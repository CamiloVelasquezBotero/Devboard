import { Request, Response } from 'express'
import User from '../models/User'
import { confirmPassword, hashPassword } from '../utils/auth'
import Token from '../models/Token'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmail'
import { generateJWT } from '../utils/jwt'

export class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body

            // Check if the user exists
            const userExists = await User.findOne({ email })
            if (userExists) {
                const error = new Error('The user already exists')
                return res.status(409).send({ error: error.message })
            }

            // Crea un usuario
            const user = new User(req.body)

            // Hash Password
            user.password = await hashPassword(password)

            // Generate Token
            const token = new Token()
            token.token = generateToken()
            token.user = user._id

            // Send Email to verify
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            // Since we alredy performed the checks with the middlewares, then we're gonna create the Model directly
            await Promise.allSettled([user.save(), token.save()])

            res.send('Account created, check your email to confirm')
        } catch (error) {
            console.error('There was an error creating the account:', error)
            res.status(500).send("There was an error creating the account")
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const tokenExists = await Token.findOne({ token })
            if (!tokenExists) {
                const error = new Error('Invalid Token')
                return res.status(401).json({ error: error.message })
            }

            // Search the user
            const user = await User.findById(tokenExists.user)

            // Confirm the user adn delete the token
            user.confirmed = true
            await Promise.allSettled([user.save(), tokenExists.deleteOne()])

            res.send('Account confirmed successfully')
        } catch (error) {
            console.error('There was an error confirming the account', error)
            res.status(500).json({ error: 'There was an error' })
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            // Find the user
            const user = await User.findOne({ email })
            if (!user) {
                const error = new Error("The user doesn't exists")
                return res.status(404).json({ error: error.message })
            }
            // Verify if the user is confirmed
            if (!user.confirmed) {
                const token = new Token()
                token.user = user._id
                token.token = generateToken()
                await token.save()

                // Send Email to verify
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })

                const error = new Error("We have just sent an email to confirm your account")
                return res.status(401).json({ error: error.message })
            }

            // Check password is correct
            const isPasswordCorrect = await confirmPassword(password, user.password)
            if(!isPasswordCorrect) {
                const error = new Error("Incorrect password")
                return res.status(401).json({ error: error.message })
            }

            /* Send the JWT token to verify the user */
            const tokenJWT = generateJWT({id: user._id})
            res.send(tokenJWT) 
        } catch (error) {
            console.error('There was an error in the login:', error)
            res.status(500).json({ error: 'The was an error login' })
        }
    }

    static requestConfirmationCode = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body

            // Check if the user exists
            const user = await User.findOne({ email })
            if (!user) {
                const error = new Error("The user doesn't exists")
                return res.status(404).send({ error: error.message })
            }
            // The user is alreay confirmed?
            if(user.confirmed) {
                const error = new Error("The user is already confirmed")
                return res.status(403).send({ error: error.message })
            }

            // Generate Token
            const token = new Token()
            token.token = generateToken()
            token.user = user._id
            await token.save()

            // Send Email to verify
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            res.send('We just sent you a new token')
        } catch (error) {
            console.error('There was an error sending the new token:', error)
            res.status(500).send("There was an error sending the new token")
        }
    }

    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            // Check if the user exists
            const user = await User.findOne({ email })
            if (!user) {
                const error = new Error("The user doesn't exists")
                return res.status(404).send({ error: error.message })
            }

            // Generate Token
            const token = new Token()
            token.token = generateToken()
            token.user = user._id
            await token.save()

            // Send Email to verify
            AuthEmail.sendPasswordResetToken({
                email: user.email,
                name: user.name,
                token: token.token
            })

            res.send('We just sent you a new token to reset your password')
        } catch (error) {
            console.error('There was an error sending the token to restore the password:', error)
            res.status(500).send("There was an error sending the token to restore the password")
        }
    }

    static validateToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const tokenExists = await Token.findOne({ token })
            if (!tokenExists) {
                const error = new Error('Invalid Token')
                return res.status(401).json({ error: error.message })
            }

            res.send('Valid Token, define your new password')
        } catch (error) {
            console.error('There was an error confirming the token', error)
            res.status(500).json({ error: 'There was an error' })
        }
    }

    static updatePasswordWithToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.params
            const { password } = req.body

            const tokenExists = await Token.findOne({ token })
            if (!tokenExists) {
                const error = new Error('Invalid Token')
                return res.status(401).json({ error: error.message })
            }

            // Get the user to modify
            const user = await User.findById(tokenExists.user)
            user.password = await hashPassword(password)

            // Save the user and remove the token
            Promise.allSettled([user.save(), tokenExists.deleteOne()])

            res.send('Password Updated')
        } catch (error) {
            console.error('There was an error confirming the token', error)
            res.status(500).json({ error: 'There was an error' })
        }
    }

    static user = async (req:Request, res:Response) => {
        // as we alreay authenticate the user with the middleware "authenticate" then we're gonna pass the user
        return res.json(req.user)
    }

    static updateProfile = async (req:Request, res:Response) => {
        try {
            const { name, email } = req.body

            // Check if the email doesn't exists or is the same of the user
            const userExists = await User.findOne({email})
            if(userExists && userExists._id.toString() !== req.user._id.toString()) {
                const error = new Error('Email is already registered')
                return res.status(409).json({ error: error.message })
            }

            // Update the user
            req.user.name = name
            req.user.email = email

            // Save the user
            await req.user.save()

            return res.status(200).send('Profile updated correctly')
        } catch (error) {
            console.error('There was an error updating the profile', error)
            res.status(500).json({ error: 'There was an error' })
        }
    }

    static updatePassword = async (req:Request, res:Response) => {
        try {
            const { current_password, password } = req.body

            // Check the if the current_password is correct
            const user = await User.findById(req.user._id)
            const isPasswordCorrect = await confirmPassword(current_password, user.password)
            if(!isPasswordCorrect) {
                const error = new Error('The current password is incorrect')
                return res.status(409).json({ error: error.message })
            }

            // Update the password and save
            user.password = await hashPassword(password)
            await user.save()

            return res.status(200).send('Password updated correctly ')
        } catch (error) {
            console.error('There was an error updating the profile', error)
            res.status(500).json({ error: 'There was an error' })
        }
    }

    static checkPassword = async (req:Request, res:Response) => {
        try {
            const { password } = req.body
            const user = await User.findById(req.user._id)

            const isPasswordCorrect = await confirmPassword(password, user.password)
            if(!isPasswordCorrect) {
                const error = new Error('The password is incorrect')
                return res.status(401).json({error: error.message})
            }

            res.status(200).send('The password is correct')
        } catch (error) {
            console.error('There was an error checking the password')
            res.status(500).json({error: 'There was an error'})
        }
    }
    
}