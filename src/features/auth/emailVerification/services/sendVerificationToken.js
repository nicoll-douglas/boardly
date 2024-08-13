export default async function sendVerificationToken(token) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
