export default function deleteAvatar() {
  return fetch(`${import.meta.env.API_URL}/api/me/avatar`, {
    method: "DELETE",
    credentials: "include",
  });
}
