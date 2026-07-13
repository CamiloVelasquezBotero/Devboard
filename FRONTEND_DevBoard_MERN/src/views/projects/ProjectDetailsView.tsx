import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getFullProject } from "../../api/ProjectApi"
import AddTaskModal from "../../components/tasks/AddTaskModal"
import TaskList from "../../components/tasks/TaskList"
import EditTaskData from "../../components/tasks/EditTaskData"
import TaskModalDetails from "../../components/tasks/TaskModalDetails"
import { useAuth } from "../../hooks/useAuth"
import { isManager } from "../../utils/polices"
import { useMemo } from "react"

export default function ProjectDetailsView() {
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()

    const { data: user, isLoading: authLoading } = useAuth()

    /* React-Query */
    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getFullProject(projectId),
        /* The number of attemps we want to it to try */
        retry: false
    })

    // Authorization for edit and delete
    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    /* Validating... */
    if(isLoading) return 'Loading...'
    if(isError) return <Navigate to={'/404'} />

    /* If the last validation is ok then we'll render the details of the Project */
    if(data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            {isManager(data.manager, user._id) && (
                <nav className="my-5 flex gap-5">
                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3  text-white text-xl font-bold cursor-pointer transition-colors rounded-md"
                        onClick={() => navigate('?newTask=true')} /* We add this condition to the url to active the the AddTask */
                    >Add Task</button>

                    <Link
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3  text-white text-xl font-bold cursor-pointer transition-colors rounded-md"
                        to={'team'}
                    >Collaborators</Link>
                </nav>
            )}

            <TaskList 
                tasks={data.tasks} 
                canEdit={canEdit}
            />

            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
