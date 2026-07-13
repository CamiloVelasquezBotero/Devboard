import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { UserLoginForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { loginUser } from "../../api/AuthApi";
import { toast } from "react-toastify";

export default function LoginView() {
  "use no memo" // Fixed bug with react-hook-form "reseting the values of formData, bug with "react-compiler""
  const navigate = useNavigate()

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success('Logging In...')
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <h1 className="text-5xl font-black text-white">Log In</h1>
      <p className="text-2xl font-light text-white mt-5">
        Start planing your projects {''}
        <span className=" text-fuchsia-500 font-bold">Logging in</span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white rounded-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "The Email is obligatory",
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

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "The password is obligatory",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Log In'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-lg"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          className="text-center text-gray-300 font-normal hover:scale-102 transition"
          to={'/auth/register'}
        >¿Don't have an account? ¡Create One!</Link>
        <Link
          className="text-center text-gray-300 font-normal hover:scale-102 transition"
          to={'/auth/forgot-password'}
        >¿Forgot your password? ¡Restore it!</Link>
      </nav>
    </>
  )
}
