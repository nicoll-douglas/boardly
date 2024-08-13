export default async function submitNewPwd(form) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form.getValues()),
  });
}
