import FetchError from "@/lib/classes/FetchError";

export default async function sendVerificationToken(token) {
  let response;
  try {
    response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
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
