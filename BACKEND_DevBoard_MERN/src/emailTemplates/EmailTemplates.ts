
interface IEmailTemplates {
    email: string
    name: string
    token: string
}

export class EmailTemplates {

    static confirmationEmailTemplate = ({email, name, token}:IEmailTemplates) : string => {
        const confirmationLink = `${process.env.FRONTEND_URL}/auth/confirm-account?token=${token}`

        return `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: Arial, Helvetica, sans-serif;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7; padding: 40px 0;">
            <tr>
                <td align="center">
                <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    
                    <!-- Header -->
                    <tr>
                    <td style="background-color: #4f46e5; padding: 24px 32px;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">DevBoard</h1>
                    </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                    <td style="padding: 32px;">
                        <h2 style="margin-top: 0; color: #111827; font-size: 18px;">Verify your account</h2>
                        <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
                        Hi ${name},
                        </p>
                        <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
                        Thanks for signing up for DevBoard with <strong>${email}</strong>. Click the button below to verify your email address and activate your account. This code expires in 10 minutes.
                        </p>
                        <div style="text-align: center; margin: 32px 0;">
                        <a href="${confirmationLink}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 6px;">
                            Confirm Account
                        </a>
                        </div>
                        <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">
                        If the button doesn't work, enter this code manually on the verification page:
                        </p>
                        <div style="text-align: center; margin: 24px 0;">
                        <span style="display: inline-block; background-color: #f3f4f6; color: #111827; font-size: 24px; font-weight: bold; letter-spacing: 6px; padding: 12px 20px; border-radius: 6px;">
                            ${token}
                        </span>
                        </div>
                        <p style="color: #6b7280; font-size: 13px; line-height: 1.5; margin-top: 24px;">
                        If you didn't create an account with DevBoard, you can safely ignore this email.
                        </p>
                    </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                    <td style="background-color: #f9fafb; padding: 16px 32px; text-align: center;">
                        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        © ${new Date().getFullYear()} DevBoard. All rights reserved.
                        </p>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
        </body>
        </html>
    `
    }

    static passwordResetTemplate = ({email, name, token}:IEmailTemplates): string => {
        const resetLink = `${process.env.FRONTEND_URL}/auth/new-password?token=${token}`

        return `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: Arial, Helvetica, sans-serif;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7; padding: 40px 0;">
            <tr>
                <td align="center">
                <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    
                    <!-- Header -->
                    <tr>
                    <td style="background-color: #4f46e5; padding: 24px 32px;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">DevBoard</h1>
                    </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                    <td style="padding: 32px;">
                        <h2 style="margin-top: 0; color: #111827; font-size: 18px;">Reset your password</h2>
                        <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
                        Hi ${name},
                        </p>
                        <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
                        We received a request to reset the password for <strong>${email}</strong>. Click the button below to continue. This code expires in 10 minutes.
                        </p>
                        <div style="text-align: center; margin: 32px 0;">
                        <a href="${resetLink}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 6px;">
                            Reset Password
                        </a>
                        </div>
                        <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">
                        If the button doesn't work, enter this code manually on the reset page:
                        </p>
                        <div style="text-align: center; margin: 24px 0;">
                        <span style="display: inline-block; background-color: #f3f4f6; color: #111827; font-size: 24px; font-weight: bold; letter-spacing: 6px; padding: 12px 20px; border-radius: 6px;">
                            ${token}
                        </span>
                        </div>
                        <p style="color: #6b7280; font-size: 13px; line-height: 1.5; margin-top: 24px;">
                        If you didn't request a password reset, you can safely ignore this email — your password will remain unchanged.
                        </p>
                    </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                    <td style="background-color: #f9fafb; padding: 16px 32px; text-align: center;">
                        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        © ${new Date().getFullYear()} DevBoard. All rights reserved.
                        </p>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
        </body>
        </html>
    `
    }
}