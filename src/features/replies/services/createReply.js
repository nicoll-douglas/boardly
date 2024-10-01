export default async function createReply(replyBody, threadId, parentId) {
  return fetch(`${import.meta.env.API_URL}/api/replies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: replyBody,
      thread: threadId,
      parent: parentId,
    }),
  });
}
