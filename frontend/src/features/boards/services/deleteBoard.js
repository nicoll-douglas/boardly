export default async function deleteBoard(boardId) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/boards/${boardId}`, {
    method: "DELETE",
    credentials: "include",
  });
}
