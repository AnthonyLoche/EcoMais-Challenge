import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading, setLoadingMessage } from "../../store/slices/loadingSlice";

export function useLoading() {
  const dispatch = useDispatch();
  const { isLoading, loadingCount, loadingMessages } = useSelector((state) => state.loading);

  const showLoading = useCallback((message = null) => {
    dispatch(startLoading(message ? { message } : undefined));
  }, [dispatch]);

  const hideLoading = useCallback((message = null) => {
    dispatch(stopLoading(message ? { message } : undefined));
  }, [dispatch]);

  const withLoading = useCallback(async (callback, message = null) => {
    showLoading(message);
    try {
      const result = await callback();
      return result;
    } finally {
      hideLoading(message);
    }
  }, [showLoading, hideLoading]);

  const setMessage = useCallback((message) => {
    dispatch(setLoadingMessage(message));
  }, [dispatch]);

  const currentMessage = loadingMessages[loadingMessages.length - 1] || "Carregando...";

  return {
    isLoading,
    loadingCount,
    loadingMessages,
    currentMessage,
    showLoading,
    hideLoading,
    withLoading,
    setMessage,
  };
}