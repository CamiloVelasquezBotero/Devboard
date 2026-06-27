import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "../../api/ProjectApi"
import AddTaskModal from "../../components/tasks/AddTaskModal"
import TaskList from "../../components/tasks/TaskList"

export default function ProjectDetailsView() {
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()

    /* React-Query */
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        /* The number of attemps we want to it to try */
        retry: false
    })
    console.log(data)


    /* Validating... */
    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to={'/404'} />

    /* If the last validation is ok then we'll render the details of the Project */
    if(data) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            <nav className="my-5 flex gap-5">
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3  text-white text-xl font-bold cursor-pointer transition-colors rounded-md"
                    onClick={() => navigate('?newTask=true')} /* We add this condition to the url to active the the AddTask */
                >Add Task</button>
            </nav>

            <TaskList 
                tasks={data.tasks}
            />

            <AddTaskModal />
        </>
    )
}
