import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Since we'll have a layout in the application then we're gonna use The "Route" for opening and closing */}
                <Route element={ <AppLayout /> } >
                    <Route path="/" element={ <DashboardView /> } index />
                    <Route path="/projects/create" element={ <CreateProjectView /> }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
