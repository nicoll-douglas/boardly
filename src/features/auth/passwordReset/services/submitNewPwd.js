export default async function submitNewPwd(form, token) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form.getValues()),
  });
}
