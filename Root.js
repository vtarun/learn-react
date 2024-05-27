import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function Rootlayout(){
    const submit = useSubmit();

    const token = useLoaderData();
    useEffect(()=>{
        if(!token){
            return;
        }
        if(token === 'EXPIRED'){
            submit(null, {action:"/logout", method:'post'})
            return null;
        }

        const tokenDuration = getTokenDuration();

        setTimeout(()=>{
            submit(null, {action:"/logout", method:'post'})
        }, tokenDuration)
    }, [token, submit]);

    return <>
        <MainNavigation />
        <main>
            <Outlet />
        </main>
    </>
}

export default Rootlayout;
