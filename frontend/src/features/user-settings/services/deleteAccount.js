export default async function deleteAccount(formValues) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
}
