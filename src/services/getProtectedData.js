import FetchError from "@/lib/classes/FetchError";

export default async function getProtectedData(endpoint, accessToken) {
  let response;
  try {
    response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch {
    throw new FetchError(0);
  }

  if (!response.ok) {
    throw new FetchError(response.status);
  }
  return response.json();
}
