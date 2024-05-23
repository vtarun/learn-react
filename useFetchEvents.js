import { useState, useEffect } from 'react';

export function useFetchEvents(){
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState();
    const [fetchEvents, setFetchEvents] = useState();
    
    useEffect(()=>{
        async function fetchEvents(){   
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/events');
            if(!response.ok){
                setError('Fetching event failed!!');
            }else{
                const resData = await response.json();
                setFetchEvents(resData.events);
            }
            setIsLoading(false);
        }
        fetchEvents();
    }, []);

    return {
        error,
        isLoading,
        fetchEvents
    }
}