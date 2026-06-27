import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "../../api/ProjectApi"
import EditProjectForm from "../../components/projects/EditProjectForm"

export default function EditProjectView() {
    const params = useParams()
    const projectId = params.projectId!

    /* React-Query */
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        /* The number of attemps we want to it to try */
        retry: false
    })


    /* Validating... */
    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to={'/404'} />

    /* If the last validation is ok then we'll render the form to edit it */
    if(data) return <EditProjectForm data={data} projectId={projectId} />
}
