import { Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import { ToastContainer } from "react-toastify"

export default function AuthLayout() {
    return (
        <>
            <div className="bg-gray-800 min-h-screen">
                <div className=" mx-auto w-[450px]">

                    <Logo />

                    <section className="mt-10">
                        <Outlet />
                    </section>

                    <footer className="py-5">
                        <p className="text-center text-white">
                            All Rights Reserved {new Date().getFullYear()}
                        </p>
                    </footer>

                    <ToastContainer
                        pauseOnHover={false}
                        pauseOnFocusLoss={false}
                    />
                </div>
            </div>

        </>
    )
}
