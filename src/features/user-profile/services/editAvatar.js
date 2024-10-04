export default async function editAvatar(file) {
  const formData = new FormData();
  formData.append("avatar", file, crypto.randomUUID());

  return fetch(`${import.meta.env.VITE_API_URL}/api/me/avatar`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });
}
