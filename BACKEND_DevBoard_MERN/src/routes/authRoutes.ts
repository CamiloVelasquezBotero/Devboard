import { Router } from 'express'
import { body } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validationMiddleware'

const router = Router()

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('The name cannot be empty'),
    body('email')
        .isEmail().withMessage('The email is invalid'),
    body('password')
        .isLength({ min: 8 }).withMessage('The password is too short. a minimum of "8" characters is required'),
    handleInputErrors,
    AuthController.createAccount
)

export default router