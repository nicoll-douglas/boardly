export default async function demo() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/demo`, {
    method: "GET",
    credentials: "include",
  });
}
