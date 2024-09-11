import { FetchError } from "@/lib/classes";

export default async function getProtectedData(endpoint) {
  let response;
  try {
    response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      method: "GET",
      credentials: "include",
    });
  } catch {
    throw new FetchError(0);
  }

  if (!response.ok) {
    throw new FetchError(response.status);
  }
  return response.json();
}
