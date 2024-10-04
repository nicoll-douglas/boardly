export default function JSONToFormData(object) {
  const formData = new FormData();
  Object.entries(object).forEach(([field, value]) => {
    formData.append(field, value instanceof FileList ? value[0] : value);
  });
  return formData;
}
