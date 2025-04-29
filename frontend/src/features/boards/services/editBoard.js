export default async function editBoard(boardId, formValues) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/boards/${boardId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
}
