import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventToDate } from "../helpers";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        // TODO: update event

        if (calendarEvent._id) {
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {

            // crear evento
            const { data } = await calendarApi.post('/events', calendarEvent);
            console.log(data);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
        }
    }

    const startDeletingEvent = () => {

        //TODO: go to backend
        dispatch(onDeleteEvent());
    }

    const startLoadingEvents = async () => {

        try {

            const { data } = await calendarApi.get('/events');

            const events = convertEventToDate(data.eventos);
            console.log(events);

        } catch (error) {
            console.log('Error loading');
            console.log(error);
        }
    }

    return {
        //* Properties
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}