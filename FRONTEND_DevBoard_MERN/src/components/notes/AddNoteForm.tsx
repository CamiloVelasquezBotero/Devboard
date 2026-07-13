import { useForm } from "react-hook-form"
import type { NoteFormData } from "../../types"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "../../api/NoteApi"
import { toast } from "react-toastify"
import { useParams, useSearchParams } from "react-router-dom"

export default function AddNoteForm() {
    "use no memo" // Fixed bug with react-hook-form "reseting the values of formData, bug with "react-compiler""
    const params = useParams()
    const [searchParams] = useSearchParams()

    const projectId = params.projectId!
    const taskId = searchParams.get('viewTask')!

    // react-hook-form
    const initialValues: NoteFormData = {
        content: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    // React Query
    const queryClient = useQueryClient()
    const { mutate, isPending} = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
            toast.success(data)
            reset()
            /* setValue('content', '') */
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        const data = { formData, projectId, taskId }
        // Mutate
        mutate(data)
    }

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate
        >
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="content">Create Note</label>
                <input
                    id="content"
                    type="text"
                    placeholder="Content for the note"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    {...register("content", {
                        required: 'The content of the note is obligatory'
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>

            <input
                type="submit"
                value={isPending ? 'Saving...' : 'Create Note'}
                disabled={isPending}
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-bold rounded-lg cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
        </form>
    )
}
