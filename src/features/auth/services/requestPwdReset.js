export default async function requestPwdReset(form) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form.getValues()),
  });
}
