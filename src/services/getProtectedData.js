import { safeFetch } from "@/lib/utils";

export default async function getProtectedData(endpoint) {
  const fetchFn = async () =>
    fetch(`${import.meta.env.API_URL}${endpoint}`, {
      method: "GET",
      credentials: "include",
    });

  const dataOrThrow = safeFetch(fetchFn);
  return dataOrThrow();
}
