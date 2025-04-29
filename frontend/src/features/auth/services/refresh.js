import { safeFetch } from "@/lib/utils";

export default async function refresh() {
  const fetchFn = async () =>
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
      method: "GET",
      credentials: "include",
    });

  const dataOrThrow = safeFetch(fetchFn);
  return dataOrThrow();
}
