import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import type { Project, ProjectFormData } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../api/ProjectApi";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  data: ProjectFormData,
  projectId: Project['_id']
}

export default function EditProjectForm({data, projectId}:EditProjectFormProps) {
  const navigate = useNavigate()

  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  /* to invalidate the queries cached with useQueryClient */
  const queryClient = useQueryClient() 

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["projects"]}) /* invalidate the query after to redirect the user tu he dashboard view */
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]}) /* And the EditProjectForm dates */
      toast.success(data)
      navigate('/')
    }
  })

  const handleForm = (formData:ProjectFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Edit Project</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Fill out the following form to edit the project</p>
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
            value={'Save Changes'}
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md"
          />
        </form>
      </div>
    </>
  )
}
