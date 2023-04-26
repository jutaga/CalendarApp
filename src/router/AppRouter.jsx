
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {

    const authStatus = 'authenticated'; // 'authenticated' // 'not-authorized'


    return (
        <Routes>
            {
                (authStatus === 'not-authorized')
                    ? <Route path='/auth/*' element={<LoginPage />} />
                    : <Route path='/*' element={<CalendarPage />} />
            }

            <Route path='/*' element={<Navigate to='/auth/login' />} />

        </Routes>
    )
}
