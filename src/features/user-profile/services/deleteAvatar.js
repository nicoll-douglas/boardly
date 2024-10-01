export default function deleteAvatar() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/me/avatar`, {
    method: "DELETE",
    credentials: "include",
  });
}
