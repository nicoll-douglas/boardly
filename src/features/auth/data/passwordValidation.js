import { regex } from "@/lib/constants";

// react-hook-form validation spec
// if requirements are to change, update the helper text
const validation = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters long",
  },
  maxLength: {
    value: 30,
    message: "Password must be no more than 30 characters long",
  },
  validate: {
    hasLetter: (value) => {
      return (
        /[a-zA-Z]/.test(value) || "Password must contain at least one letter"
      );
    },
    hasNumber: (value) => {
      return /[0-9]/.test(value) || "Password must contain at least one number";
    },
    hasInvalid: (value) => {
      return (
        regex.lax.noWhiteSpace.test(value) ||
        "Password contains an invalid character"
      );
    },
  },
};

export default validation;
