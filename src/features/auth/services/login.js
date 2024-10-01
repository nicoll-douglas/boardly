export default async function login(form) {
  return fetch(`${import.meta.env.API_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(form.getValues()),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
