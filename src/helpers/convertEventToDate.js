import { parseISO } from "date-fns";


export const convertEventToDate = (eventos = []) => {

    return eventos.map(event => {

        event.end = parseISO(event.end);
        event.start = parseISO(event.start);

        return event;
    })
}
