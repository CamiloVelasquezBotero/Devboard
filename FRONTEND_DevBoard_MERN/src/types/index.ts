import { z } from 'zod'

/* Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
})
export type Project = z.infer<typeof projectSchema> /* we infer from the zod schema created */
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'> /* 'we used the utility types */