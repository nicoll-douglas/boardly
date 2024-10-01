export default async function createBoard(formValues) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/boards`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
}
