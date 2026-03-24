import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { LoginService } from "../../services";
import {
  loginSuccess,
  logout as logoutAction,
  setError,
} from "../../store/slices/authSlice";
import { useLoading } from "../global/useLoading";
import { toast } from "sonner";

export function useAuth() {
  const dispatch = useDispatch();
  const { withLoading } = useLoading();
  const state = useSelector((state) => state.auth);

  const login = useCallback(async (credentials) => {
    return withLoading(async () => {
      try {
        const response = await LoginService.login(credentials.email, credentials.password);
        dispatch(loginSuccess(response.data));
        toast.success("Bem-vindo, login realizado com sucesso!");
        return true;
      } catch (error) {
        dispatch(setError(error.message));
        toast.error(error?.message ?? "Erro ao autenticar. Tente novamente.");
        return false;
      }
    }, "Autenticando...");
  }, [dispatch, withLoading]);

  const logout = useCallback(() => {
    dispatch(logoutAction());
    toast.success("Sessão encerrada com sucesso.");
  }, [dispatch]);

  return {
    ...state,
    login,
    logout,
  };
}