// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components


import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import EventsPage, { loader as eventsloader } from './pages/Events';
import EditEventPage from './pages/EditEvent';
import EventDetailsPage, {loader as eventDetailsloader, action as eventDetailsAction} from './pages/EventDetails';
import NewEventPage from './pages/NewEvent';
import Rootlayout from './pages/Root';
import EventsNavigation from './components/EventsNavigation';
import {action as manipulateFormAction} from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage, {action as authAction} from './pages/Authentication';
import {action as logoutAction} from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth';


const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Rootlayout />,
    id : 'root',
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <HomePage />},
      {
        path: 'events', 
        element: <EventsNavigation />,
        children: [
          { 
            index: true, 
            element: <EventsPage />,
            loader: eventsloader
          },
          {
            path: ':eventId',
            id: 'event-details',
            loader: eventDetailsloader,
            children: [
              {
                index: true, 
                element: <EventDetailsPage />,
                action: eventDetailsAction
              },
              {
                path: 'edit', 
                element: <EditEventPage />, 
                action: manipulateFormAction,
                loader: checkAuthLoader
              }
            ]
          },
          {
            path: 'new', 
            element: <NewEventPage />,
            action: manipulateFormAction,
            loader: checkAuthLoader
          }
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
