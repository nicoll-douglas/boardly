export default async function deleteThread(id) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/threads/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}
