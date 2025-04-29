export default async function logout() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
