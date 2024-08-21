import JSONToFormData from "@/lib/utils/JSONToFormData";

export default async function changeAvatar(accessToken, form, method) {
  const url = `${import.meta.env.VITE_API_URL}/api/me/profile/avatar`;
  const options = {
    method: method,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (method === "PUT") {
    options.body = JSONToFormData(form.getValues());
  }

  return fetch(url, options);
}
