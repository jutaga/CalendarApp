import { parse, startOfWeek, getDay, format } from 'date-fns';
import enUS from 'date-fns/locale/es';
import { dateFnsLocalizer } from 'react-big-calendar';



const locales = {
    'en-US': enUS,
}

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})