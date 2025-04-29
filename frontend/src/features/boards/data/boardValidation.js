import { regex } from "@/lib/constants";

const validation = {
  name: {
    required: "Name is required",
    pattern: {
      value: regex.restricted,
      message: "Name contains an invalid character",
    },
    maxLength: {
      value: 20,
      message: "Name must be no more than 20 characters long",
    },
  },
  rules: {
    required: false,
    maxLength: {
      value: 100,
      message: "Rules must be no more than 100 characters long",
    },
  },
};

export default validation;
