import { useEffect } from "react";

export default function useQueryHandlers(error, data, onError, onData) {
  useEffect(() => {
    if (!onError) return;
    if (error && onError) return onError();
  }, [error]);

  useEffect(() => {
    if (!onData) return;
    if (data) return onData();
  }, [data]);
}
