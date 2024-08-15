export default async function submitEmail(form) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: form.getValues(),
  });
}
