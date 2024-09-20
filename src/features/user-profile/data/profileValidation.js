import { regex } from "@/lib/constants";
import config from "@/config";

const validation = {
  age: {
    required: false,
    setValueAs: (v) => {
      if (v === "0") return 0;
      if (v === "") return "";
      return Number(v);
    },
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
      regex.lax.whiteSpace.test(value) || "Bio contains an invalid character",
  },
  avatar: {
    required: false,
    validate: {
      size: ([firstFile]) => {
        return (
          firstFile.size <= config.imgUploads.maxSize ||
          "Avatar size must be no more than 2MB"
        );
      },
      dimensions: async ([firstFile]) => {
        return new Promise((resolve) => {
          const img = new Image();
          const url = URL.createObjectURL(firstFile);
          img.src = url;
          const { maxDimensions } = config.imgUploads;

          img.onload = () => {
            URL.revokeObjectURL(url);
            const sizeOK =
              img.width < maxDimensions.width &&
              img.height < maxDimensions.height;
            resolve(
              sizeOK ||
                `Avatar dimensions must be no more than ${maxDimensions.width}x${maxDimensions.height}`
            );
          };

          img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve("Avatar file could not be loaded");
          };
        });
      },
    },
  },
};

export default validation;
