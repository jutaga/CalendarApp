import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventToDate } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {


        try {
            if (calendarEvent.id) {
                //Actualizar
                const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            // crear evento
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))

        } catch (error) {
            console.log(error);
            Swal.fire('Error adding event', 'Not authorized', 'error');
        }


    }

    const startDeletingEvent = async () => {

        //TODO: go to backend
        try {

            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());

        } catch (error) {
            console.log(error);
            Swal.fire('Error deleting event', 'Not authorized', 'error');

        }


    }

    const startLoadingEvents = async () => {

        try {

            const { data } = await calendarApi.get('/events');

            const events = convertEventToDate(data.eventos);
            dispatch(onLoadEvents(events))

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