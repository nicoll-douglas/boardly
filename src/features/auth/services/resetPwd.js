export default async function resetPwd(form, token) {
  return fetch(`${import.meta.env.API_URL}/api/auth/reset`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form.getValues()),
  });
}
