import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLoguot } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth/', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {

            dispatch(onLoguot('Credenciales Incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);

        }
    }

    const startRegister = async ({ name, email, password }) => {

        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/new/', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLoguot('Usuario Ya Existe'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }


    }


    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLoguot());

        try {
            const { data } = await calendarApi.get('/auth/renew/')
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLoguot());
        }

    }

    const startLogOut = () => {
        localStorage.clear();
        dispatch(onLoguot());
    }




    return {
        //* Properties
        status,
        user,
        errorMessage,

        //* Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogOut,
    }

}
