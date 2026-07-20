import { transporter } from "../config/nodemailer"
import { EmailTemplates } from "../emailTemplates/EmailTemplates"

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async ({ email, name, token }:IEmail) => {
        // Send Email to verify
        await transporter.sendMail({
            from: "DevBoard Confirmation",
            to: email,
            subject: 'DevBoard - Confirm your account!!',
            html: EmailTemplates.confirmationEmailTemplate({email, name, token})
        })
    }

    static sendPasswordResetToken = async ({email, name, token}:IEmail) => {
        await transporter.sendMail({
            from: 'DevBoard ResetPassword',
            to: email,
            subject: 'DevBoard - Reset Your Password',
            html: EmailTemplates.passwordResetTemplate({email, name, token})
        })
    }
}