import { regex } from "@/lib/constants";

const validation = {
  age: {
    required: false,
    valueAsNumber: true,
    min: {
      value: 0,
      message: "Age must be greater than 0",
    },
    max: {
      value: 120,
      message: "Age must be no more than 120",
    },
  },
  pronouns: {
    required: false,
    maxLength: {
      value: 10,
      message: "Pronouns must be no longer than 10 characters",
    },
    validate: (value) =>
      regex.lax.noWhiteSpace.test(value) ||
      "Pronouns contain an invalid character",
  },
  bio: {
    required: false,
    maxLength: {
      value: 100,
      message: "Bio must be no longer than 100 characters",
    },
    validate: (value) =>
      regex.lax.whitespace.test(value) || "Bio contains an invalid character",
  },
};

export default validation;
