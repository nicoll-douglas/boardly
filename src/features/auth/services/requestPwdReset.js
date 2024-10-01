export default async function requestPwdReset(form) {
  return fetch(`${import.meta.env.API_URL}/api/auth/forgot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form.getValues()),
  });
}
