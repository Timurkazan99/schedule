import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Context } from '../components/ContextProvider.jsx';
import { check } from '../http/userApi';
import { update } from '../store/reducers/DateSlice';

export default function useLogin() {
  const dispatch = useDispatch();
  const { logined } = useContext(Context);
  const newDate = new Date().toDateString();

  return async () => {
    try {
      dispatch(update({ newDate }));
      const { apiKey, ...user } = await check();
      logined.setUser(user);
      logined.setIsAuth(true);
      return { isAuth: true, apiKey };
    } catch {
      logined.setUser({});
      logined.setIsAuth(false);
      return { isAuth: false, apiKey: '' };
    }
  };
}
