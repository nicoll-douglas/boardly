export default async function refresh() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
    method: "GET",
    credentials: "include",
  });
}
