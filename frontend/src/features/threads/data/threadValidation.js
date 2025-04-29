const validation = {
  title: {
    required: "Title is required",
    maxLength: {
      value: 50,
      message: "Title must be no more than 50 characters long",
    },
  },
  body: {
    required: false,
    maxLength: {
      value: 100,
      message: "Body must be no more than 100 characters long",
    },
  },
  board: {
    required: true,
  },
};

export default validation;
