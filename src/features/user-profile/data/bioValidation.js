import { laxAndWhitespace } from "@/lib/constants/regex";

const validation = {
  required: false,
  maxLength: {
    value: 100,
    message: "Bio must be no more than 100 characters long",
  },
  validate: (value) =>
    laxAndWhitespace.test(value) || "Bio contains an invalid character",
};

export default validation;
