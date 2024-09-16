import { useEffect } from "react";

export default function useQueryHandlers(error, data, onError, onData) {
  useEffect(() => {
    if (error) return onError();
  }, [error]);

  useEffect(() => {
    if (data) return onData();
  }, [data]);
}
