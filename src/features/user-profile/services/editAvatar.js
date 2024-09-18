export default async function editAvatar(currentUser, file) {
  const formData = new FormData();
  formData.append("avatar", file, crypto.randomUUID());

  return fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${currentUser.username}/avatar`,
    {
      method: "PUT",
      credentials: "include",
      body: formData,
    }
  );
}
