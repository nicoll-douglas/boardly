const getSubmit = async (form) => {
  return async () =>
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(form.getValues()),
      headers: {
        "Content-Type": "application/json",
      },
    });
};

export default getSubmit;
