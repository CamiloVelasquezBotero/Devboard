import { getUser } from "../api/AuthApi"
import { useQuery } from "@tanstack/react-query"

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        // Refetch when the users back to the window
        refetchOnWindowFocus: false
    })

    return { data, isError, isLoading }
}
