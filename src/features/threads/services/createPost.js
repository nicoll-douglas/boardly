export default async function createPost(formObject) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/threads`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });
}
