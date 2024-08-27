export default function getSubmit(form) {
  return async () =>
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(form.getValues()),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
}
