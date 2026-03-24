import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { LoginService } from "../../services";
import {
  loginSuccess,
  logout as logoutAction,
  setError,
} from "../../store/slices/authSlice";
import { useLoading } from "../global/useLoading";

export function useAuth() {
  const dispatch = useDispatch();
  const { withLoading } = useLoading();
  const state = useSelector((state) => state.auth);

  const login = useCallback(async (credentials) => {
    return withLoading(async () => {
      try {
        const response = await LoginService.login(credentials.email, credentials.password);
        dispatch(loginSuccess(response.data));
        return true;
      } catch (error) {
        dispatch(setError(error.message));
        console.error("Login failed:", error);
        return false;
      }
    }, "Autenticando...");
  }, [dispatch, withLoading]);

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return {
    ...state,
    login,
    logout,
  };
}