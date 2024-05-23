import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

function Rootlayout(){
    return <>
        <MainNavigation />
        <main>
            <Outlet />
        </main>
    </>
}

export default Rootlayout;