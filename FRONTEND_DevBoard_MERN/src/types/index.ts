import { z } from 'zod'
/*  --------------------------------------------- PROJECTS ------------------------------------*/

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
})

/* We're gonna use a pick if the projectSchema changes */
export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
    })
)

export type Project = z.infer<typeof projectSchema> /* we infer from the zod schema created */
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'> /* 'we used the utility types */

/*  ---------------------------------------------- TASKS ----------------------------------------------*/

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]) /* we validating if is one of the folloging status */
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    taskName: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string()
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'taskName' | 'description'>
