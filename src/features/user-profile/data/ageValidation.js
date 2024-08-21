const validation = {
  required: false,
  valueAsNumber: true,
  max: {
    value: 120,
    message: "Age must be less than 120",
  },
  min: {
    value: 13,
    message: "Age must be greater than 13",
  },
};

export default validation;
