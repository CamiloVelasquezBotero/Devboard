import { Link, Outlet } from "react-router-dom" /* 'we're gonna use this component to be able to render the children components */
import { ToastContainer } from 'react-toastify' /* The component that we're gonna use for the notifications */
import 'react-toastify/dist/ReactToastify.css' /* Styles for react-toastify */
import Logo from "../components/Logo"
import NavMenu from "../components/NavMenu"

export default function AppLayout() {
  return (
    <>
        <header
            className="bg-gray-800 py-5 px-10"
        >
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                <div className="w-64">
                    <Link to={'/'}>
                        <Logo /> 
                    </Link>
                </div>

                <NavMenu />
            </div>
        </header>

        <section className="max-w-screen-2xl mx-auto mt-10 py-5 px-20">
            <Outlet />
        </section>

        <footer className="py-5">
            <p className="text-center">
                All Rights Reserved {new Date().getFullYear()}
            </p>
        </footer>

        <ToastContainer 
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
