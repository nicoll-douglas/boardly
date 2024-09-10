export default async function verify(token) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
