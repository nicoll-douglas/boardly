import JSONToFormData from "@/lib/utils/JSONToFormData";

export default async function submitToProtected(
  endpoint,
  accessToken,
  form,
  options = {}
) {
  const { formData } = options;

  const fetchOptions = {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData
      ? JSONToFormData(form.getValues())
      : JSON.stringify(form.getValues()),
  };

  if (!formData) {
    fetchOptions.headers["Content-Type"] = "application/json";
  }

  return fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, fetchOptions);
}
