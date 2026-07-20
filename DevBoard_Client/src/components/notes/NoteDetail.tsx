import type { Note } from "../../types"
import { formatDate } from "../../utils/formatDate"
import { useAuth } from "../../hooks/useAuth"
import { useMemo } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "../../api/NoteApi"
import { toast } from "react-toastify"
import { useParams, useSearchParams } from "react-router-dom"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {
    const params = useParams()
    const [ searchParams ] = useSearchParams()
    const { data, isLoading } = useAuth()
    
    const projectId = params.projectId!
    const taskId = searchParams.get('viewTask')!
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

    // React Query
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: error => toast.error(error.message),
        onSuccess: data => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })

    if(isLoading) return 'Loading...'

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>

            {canDelete && (
                <button
                    className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors rounded-md"
                    onClick={() => mutate({ projectId, taskId, noteId: note._id })}
                >Eliminar</button>   
            )}

        </div>
    )
}
