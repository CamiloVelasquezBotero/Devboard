import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { PinInput, PinInputField } from '@chakra-ui/pin-input'

import type { ConfirmToken } from "../../types";
import { confirmAccount } from "../../api/AuthApi";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
    const [ searchParams ] = useSearchParams()
    const queryToken = searchParams.get('token')
    const navigate = useNavigate()

    const [token, setToken] = useState<ConfirmToken['token']>(queryToken ? queryToken : '')

     // React Query
     const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message, { toastId: 'account-confirmed-error'})
        },
        onSuccess: (data) => {
            toast.success(data, { toastId: 'account-confirmed'})
            navigate('/auth/login')
        }
     })

    useEffect(() => {
        if(queryToken) {
            mutate({ token: queryToken})
        }
    }, [queryToken])

    const handleChange = (token:ConfirmToken['token']) => {
        setToken(token)
    }

    const handleComplete = (token:ConfirmToken['token']) => {
        mutate({token})
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirm your account</h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter the code you received {''}
                <span className=" text-fuchsia-500 font-bold">by e-mail</span>
            </p>
            <form
                className="space-y-8 p-10 bg-gray-100 mt-10 rounded-lg"
            >
                <label
                    className="font-bold text-2xl text-center block"
                >6-digit code</label>

                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/request-code'
                    className="text-center text-gray-300 font-normal"
                >
                    Request a new code
                </Link>
            </nav>

        </>
    )
}
