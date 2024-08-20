export default function useFormData(form) {
  const formData = new FormData();
  Object.entries(form.getValues()).forEach(([field, value]) => {
    if (value instanceof FileList) {
      formData.append(field, value[0]);
    } else {
      formData.append(field, value);
    }
  });
  return formData;
}
