import { z } from 'zod'

/*  --------------------------------------------- AUTH & USERS ------------------------------------*/
const authSchema = z.object({
    name: z.string(),
    email: z.email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

export type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type UpdateCurrentPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>
export type CheckPasswordForm = Pick<Auth, 'password'>

/*  --------------------------------------------- USERS ------------------------------------*/

export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name' | 'email'>

/*  ---------------------------------------------- NOTES ----------------------------------------------*/

const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string()
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

/*  ---------------------------------------------- TASKS ----------------------------------------------*/

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]) /* we validating if is one of the folloging status */
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    taskName: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema
    })),
    notes:z.array(noteSchema),
    createdAt: z.string(),
    updatedAt: z.string()
})

export const taskProjectSchema = taskSchema.pick({
    _id: true,
    taskName: true,
    description: true,
    status: true
})

export type TaskProject = z.infer<typeof taskProjectSchema>
export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'taskName' | 'description'>

/*  --------------------------------------------- PROJECTS ------------------------------------*/

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(),
    tasks: z.array(taskProjectSchema),
    team: z.array(z.string())
})

/* We're gonna use a pick if the projectSchema changes */
export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)

export const editProjectSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
})

export type Project = z.infer<typeof projectSchema> /* we infer from the zod schema created */
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'> /* 'we used the utility types */

/*  ---------------------------------------------- TEAM ----------------------------------------------*/

const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
})

export const teamMembersSchema = z.array(teamMemberSchema)

export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>