export default async function editProfile(body) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
