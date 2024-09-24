import refresh from "../services/refresh";
import { useQuery } from "@tanstack/react-query";
import { useNotif, useQueryHandlers } from "@/hooks";
import config from "@/config";
// import { useAuth } from "@/features/auth";

export default function usePrivilege() {
  const notifs = useNotif();
  const privilegeEnabled = config.fetch.privilegeEnabled;
  // const { setCurrentUser } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["GET /refresh"],
    queryFn: async () => refresh(),
    staleTime: config.auth.accessTime,
    retry: false,
    enabled: privilegeEnabled,
  });

  const onError = () => {
    switch (error.status) {
      case 500:
        notifs.serverError();
        break;
      case 429:
        notifs.tooMany();
        break;
      case 0:
        notifs.networkError();
    }
  };
  // const onData = () => setCurrentUser(data.user);

  // useQueryHandlers(error, data, onError, onData);
  useQueryHandlers(error, data, onError);

  if (!privilegeEnabled) return { elevated: false, isLoading: false };

  const dataExists = !!data;
  return { elevated: dataExists, isLoading };
}
