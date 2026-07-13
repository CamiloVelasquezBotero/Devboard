import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import type { TeamMemberForm } from "../../types";
import { findUserByEmail } from "../../api/TeamApi";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    "use no memo" // Fixed bug with react-hook-form "reseting the values of formData, bug with "react-compiler""
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUserByEmail
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = { projectId, formData }
        mutation.mutate(data)
    }

    const resetData = () => {
        reset(),
        mutation.reset
    }

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >E-mail de Usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Email of the user to add"
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        {...register("email", {
                            required: "The email is obligatory",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-lg"
                    value='Search user'
                />
            </form>

            <div>
                {/* TODO: Agregar spinner */}
                {mutation.isPending && <p className="text-center mt-10">Cargando...</p>}
                {mutation.error && <p className="text-center mt-10">{mutation.error.message}</p>}
                {mutation.data && <SearchResult user={mutation.data} reset={resetData} />}
            </div>
        </>
    )
}