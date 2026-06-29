import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TaskForm from './TaskForm';
import type { TaskFormData } from '../../types';
import { createTask } from '../../api/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {
    const location = useLocation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    /* Get the queries from the URL */
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('newTask')
    const show = modalTask ? true : false
    
    /* const [ searchParams ] = useSearchParams()
    const queryParam = searchParams.get('newTask')  */

    /*Get the ProjectId from the params */
    const params = useParams()
    const projectId = params.projectId!

    /* react-hook-form */
    const initialValues:TaskFormData = {
        taskName: '',
        description: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({defaultValues: initialValues})

    /* React-Query */
    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            toast.success(data)
            reset() /* Reset The Form */
            navigate(location.pathname, {replace: true})    /* Close The modal */
        }
    })

    const handleCreateTask = (formData:TaskFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data) /* React-Query */
    }

    return ( 
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}> {/* Replace the query of the URL with navigate replace in the options */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        New Task
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Fill out the form and create  {''}
                                        <span className="text-fuchsia-600">a new task</span>
                                    </p>

                                    <form
                                        className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleCreateTask)}
                                    >

                                        <TaskForm 
                                            register={register}
                                            errors={errors}
                                        />

                                        <input 
                                            type="submit" 
                                            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md"
                                            value={'Save Task'}
                                        />


                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
