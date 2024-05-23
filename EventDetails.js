import { json, useRouteLoaderData, redirect, defer, Await } from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

function EventDetailsPage(){
    const {event, events} = useRouteLoaderData('event-details');
    // const event = data.event;
    return (
        <>  
            <Await resolve={event}>
                {(loadedEvent)=><EventItem event={loadedEvent}/>}
            </Await>
            <Await resolve={events}>
                {(loadedEvents)=><EventsList events={loadedEvents} />}
            </Await>
        </>
    )
}

export default EventDetailsPage;

async function loadEvent(id){
    const response = await fetch('http://localhost:8080/events/'+ id);
    if(!response.ok){
        throw json({message: 'could not found selected event details'}, {status: 500});
    }else {
        const resData = await response.json();
        return resData.events;
    }
}
async function loadEvents(){
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

export function loader({request, params}){
    const id = params.eventId;
    // const response = await fetch('http://localhost:8080/events/'+ id);
    // if(!response.ok){
    //     throw json({message: 'could not found details'}, {status: 500});
    // }else {
    //     return response;
    // }

    return defer({
        events: loadEvents(),
        event: loadEvent(id)
    })

}

export async function action({request, params}){
    const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/'+id , {
        method: request.method
    })

    if(!response.ok){
        throw json({message: 'could not delete event'}, {status: 500});
    }

    return redirect('/events');
}