import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTaskById } from "../../api/TaskAPI"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {
    /* Get the params from the Url */
    const params = useParams()
    const projectId = params.projectId!
 
    /* Get the taskId from the Search Queries */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!

    /* React-Query */
    const { data, isError, isLoading } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId /* we'll convert the variable in boolean to enabled the queryFn if we got something */
    })

    if (isLoading) return 'Cargando...'
    if(isError) return <Navigate to={'/404'} />

    if(data) return <EditTaskModal data={data} taskId={taskId} />
}
