export default function getSubmit(form) {
  return async () =>
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
      method: "POST",
      body: JSON.stringify(form.getValues()),
      headers: {
        "Content-Type": "application/json",
      },
    });
}
