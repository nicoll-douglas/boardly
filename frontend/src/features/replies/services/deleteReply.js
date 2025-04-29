export default async function deleteReply(replyId) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/replies/${replyId}`, {
    method: "DELETE",
    credentials: "include",
  });
}
