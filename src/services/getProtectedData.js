export default async function getProtectedData(endpoint, accessToken) {
  return fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
