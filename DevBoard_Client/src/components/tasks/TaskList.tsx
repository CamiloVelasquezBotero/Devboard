import type { Project, TaskProject, TaskStatus } from "../../types"
import TaskCard from "./TaskCard"
import { statusTranslations } from "../../locales/en"

import DropTask from "./DropTask"
import { DragDropProvider } from "@dnd-kit/react"
import type { DragEndEvent } from "@dnd-kit/abstract"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateStatus } from "../../api/TaskAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type TaskListProps = {
    tasks: TaskProject[]
    canEdit: Boolean
}

/* Every group will be a array Task  */
type groupedTasks = {
    [key: string]: TaskProject[]
}
const initialStatusGroups: groupedTasks = {
    pending: [],
    inProgress: [],
    onHold: [],
    underReview: [],
    completed: [],
}

const statusStyles: { [key: string]: string } = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500',
}

export default function TaskList({ tasks, canEdit }: TaskListProps) {
    const params = useParams()

    const projectId = params.projectId!

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    // React Query
    const queryClient = useQueryClient()
        const { mutate } = useMutation({
            mutationFn: updateStatus,
            onError: (error) => {
                toast.error(error.message)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({queryKey: ['project', projectId]})
                toast.success(data)
            }
        })

    const handleDragEnd = (event:DragEndEvent) => {
        if(event.canceled) return

        // Check if is dropped valid
        if(event.operation.target?.id) {
            const taskId = event.operation.source?.id.toString()! // The taskId from the Draggable
            const status = event.operation.target?.id as TaskStatus // The status from the Droppable

            // Mutation
            mutate({projectId, taskId, status})

            // Update the cache from query data for make the changes more fast in the UI
            queryClient.setQueryData(['project', projectId], (oldData:Project) => {
                const updatedTasks = oldData.tasks.map((task:TaskProject) => {
                    // If the task is the same... then we're gonna update it
                    if(task._id === taskId) {
                        return {
                            ...task,
                            status
                        }
                    }
                    return task
                })

                // Return the data updated for queryClient
                return {
                    ...oldData,
                    tasks: updatedTasks
                }
            }) 
        }
    }

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tasks</h2>
            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                
                <DragDropProvider
                    onDragEnd={handleDragEnd}
                >
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <h3
                                className={`capitalize text-xl font-light boder boder-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
                            >{statusTranslations[status]}</h3>
                            <DropTask status={status} />
                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">There are no tasks</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DragDropProvider>

            </div>
        </>
    )
}
