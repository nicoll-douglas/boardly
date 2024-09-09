import FetchError from "@/lib/classes/FetchError";

export default async function refresh() {
  let response;
  try {
    response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
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
