import useAuth from "@/lib/hooks/useAuth";

export default function useEmailVerification(token) {
  const { setAccessToken } = useAuth();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["PATCH /auth/verify"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    staleTime: 0,
    retry: false,
  });
}
