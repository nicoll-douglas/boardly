import { safeFetch } from "@/lib/utils";

export default async function getProtectedData(endpoint) {
  const fetchFn = async () =>
    fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      method: "GET",
      credentials: "include",
    });

  const dataOrThrow = safeFetch(fetchFn);
  return dataOrThrow();
}
