import { safeFetch } from "@/lib/utils";

export default async function verify(token) {
  const fetchFn = async () =>
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const dataOrThrow = safeFetch(fetchFn);
  return dataOrThrow();
}
