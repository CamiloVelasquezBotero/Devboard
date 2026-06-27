import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify"; /* The function from toastify to call the component */
import ProjectForm from "../../components/projects/ProjectForm";
import type { ProjectFormData } from "../../types";
import { createProject } from "../../api/ProjectApi";

export default function CreateProjectView() {

    const initialValues: ProjectFormData = {
        projectName: '',
        clientName: '',
        description: ''
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    /* "useNavigate to redirect the user with "react-router-dom"" */
    const navigate = useNavigate()

    /* We create the instance for the mutation from react-query */
    const mutation = useMutation({
        mutationFn: createProject,
        onError: () => {
            /* We get the message of the error with "error.message" */
            toast.error('There was an error creating the project, try again')
        },
        onSuccess: (data) => { /* We get the data return to the mutationFunction "createFunction" */
            toast(data.message)
            navigate('/') /* Once we created the new project, we'll redirect the user to the main page to view the projects */
        }
    })

    /* This handleForm it'll be pass it to the handleSubmit of "useForm", so we'll pass it the type of the initial values too for the dates that the user will send us */
    const handleForm = async (formData: ProjectFormData) => { /* The "creteProject" function is async so we're gonna put async in this too  */
        /* const data = await createProject(formData) */
        
        mutation.mutate(formData) /* The ReactQuery operates automatically the async requests */
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Create Project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Fill out the following form to create the new project</p>
                <nav className="my-5">
                    <Link
                        to={'/'}
                        className="bg-purple-400 hover:bg-purple-500 px-10 p-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-md"
                    >Back to Projects</Link>
                </nav>
                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate /* since we're gonna validate with "react-hook-form, then we disabled this" */
                >

                    {/* This is gonna be the form content, so we need to pass the props "registera and errors" from react-hook-form */}
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />

                    <input
                        type="submit"
                        value={'Create Project'}
                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md"
                    />
                </form>
            </div>
        </>
    )
}
