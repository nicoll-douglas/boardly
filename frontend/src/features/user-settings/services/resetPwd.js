export default async function resetPwd(formValues) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/me/password`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
}
