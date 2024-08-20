export default function JSONToFormData(object) {
  const formData = new FormData();
  Object.entries(object).forEach(([field, value]) => {
    if (value instanceof FileList) {
      formData.append(field, value[0]);
    } else {
      formData.append(field, value);
    }
  });
  return formData;
}
