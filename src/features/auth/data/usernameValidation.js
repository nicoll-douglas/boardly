import { regex } from "@/lib/constants";

// react-hook-form validation spec
// if requirements are to change, update the helper text
const validation = {
  required: "Username is required",
  maxLength: {
    value: 20,
    message: "Username must be no more than 20 characters long",
  },
  pattern: {
    value: regex.restricted,
    message: "Username contains an invalid character",
  },
};

export default validation;
