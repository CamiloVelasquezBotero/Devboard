import { Router } from 'express'
import { body, param } from 'express-validator'
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
    body('password_confirmation').custom((value, {req}) => { /* We create the validator (custom) to make our own script to verify it, we pass it the value, and destructuring of the Request */
        if(value !== req.body.password) {
            throw new Error("the passwords don't match")
        }
        return true /* If the passwords match, then we're gonna pass to the next middleware */
    }),
    handleInputErrors,
    AuthController.createAccount
)

router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('The token cannot be empty'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email')
        .isEmail().withMessage('Invalid E-mail'),
    body('password')
        .notEmpty().withMessage('The password cannot be empty'),
    handleInputErrors,
    AuthController.login
)

router.post('/request-code',
    body('email')
        .isEmail().withMessage('Invalid E-mail'),
    handleInputErrors,
    AuthController.requestConfirmationCode
)

router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('Invalid E-mail'),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('The token cannot be empty'),
    handleInputErrors,
    AuthController.validateToken
)

router.post('/update-password/:token',
    param('token')
        .isNumeric().withMessage('Invalid Token'),
    body('password')
        .notEmpty().withMessage('The password cannot be empty'),
    body('password')
        .isLength({ min: 8 }).withMessage('The password is too short. a minimum of "8" characters is required'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error("The passwords doesn't match")
        }
        return true
    }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
)

export default router