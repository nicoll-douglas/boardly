export default function getSubmit(form) {
  return async () =>
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.getValues()),
    });
}
