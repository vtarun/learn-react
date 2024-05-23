import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

// import { useFetchEvents } from './../hooks/useFetchEvents';


function EventsPage(){
    // const { isLoading, error, fetchEvents } = useFetchEvents();
    
    // return <>
    //     <div style={{textAlign: 'center'}}>
    //         {isLoading && <p>Loading...</p>}
    //         {error && <p>{error}</p>}
    //         {!isLoading && fetchEvents && <EventsList events={fetchEvents} />}
    //     </div>
    // </>

    // const fetchEvents = useLoaderData();
    // const data  = useLoaderData();
    // const fetchEvents = data.events;
    // return <EventsList events={fetchEvents} />

    const {events} = useLoaderData();

    return <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
            {(loadedEvents)=> <EventsList events={loadedEvents} />}
        </Await>
    </Suspense>
}

export default EventsPage;

export async function eventLoader(){
    const response = await fetch('http://localhost:8080/events');
    
    if(!response.ok){
        // throw {message: 'error occured.'};
        // throw new Response(JSON.stringify({message: 'could not fetch events.'}), {status: 500});
        throw json({message: 'could not fetch events.'}, {status: 500})
    }else{
        const resData = await response.json();
        return resData.events;
    } 
}

export function loader(){
    return defer({
        events: eventLoader()
    })
}

