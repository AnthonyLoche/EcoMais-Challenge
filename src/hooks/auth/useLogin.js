import { useDispatch, useSelector } from "react-redux";
import {LoginService} from "../../services";
import {
  setLoading,
  loginSuccess,
  logout as logoutAction,
  setError,
} from "../../store/slices/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const login = async (credentials) => {
    dispatch(setLoading(true));
    try {
      // CORREÇÃO: chamar o método login, não log
      const response = await LoginService.login(credentials.email, credentials.password);

      // Se chegou aqui, o login foi bem sucedido
      dispatch(loginSuccess(response.data));
      return true;
      
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Login failed:", error);
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    ...state,
    login,
    logout,
  };
}