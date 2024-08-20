export default function validateCharacters(value, message) {
  return /^\d+$/.test(value) || message;
}
