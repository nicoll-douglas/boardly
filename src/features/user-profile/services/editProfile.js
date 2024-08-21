export default async function editProfile(accessToken, form) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/me/profile/info`, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form.getValues()),
  });
}
