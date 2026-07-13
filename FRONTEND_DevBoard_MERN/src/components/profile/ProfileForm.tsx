import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import type { User, UserProfileForm } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../../api/ProfileApi"
import { toast } from "react-toastify"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data }:ProfileFormProps) {
    "use no memo"
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    // React Query  
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: error => toast.error(error.message),
        onSuccess: data => {
            toast.success(data)
        }
    })

    const handleEditProfile = (formData:UserProfileForm) => {
        mutate(formData)
        queryClient.invalidateQueries({queryKey: ['user']})
    }

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">My Profile</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">You can change your information here</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3  border border-gray-200 rounded-md"
                            {...register("name", {
                                required: "The name of the user is obligatory",
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >E-mail</label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3  border border-gray-200 rounded-md"
                            {...register("email", {
                                required: "The E-mail is obligatory",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid E-mail",
                                },
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>
                    <input
                        type="submit"
                        value='Save changes'
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors rounded-md"
                    />
                </form>
            </div>
        </>
    )
}
