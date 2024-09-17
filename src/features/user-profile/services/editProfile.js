export default async function editProfile(currentUser, form) {
  return fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${currentUser.username}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.getValues()),
    }
  );
}
