import {
  MAX_FILE_SIZE,
  MAX_DIMENSIONS,
  ALLOWED_TYPES,
} from "@/config/imgUploads";

function getImgValidation(options = {}) {
  const { required = false } = options;

  return {
    required,
    validate: {
      size: ([firstFile]) => {
        if (!required) {
          if (!firstFile) return true;
        }
        return (
          firstFile.size < MAX_FILE_SIZE || "Image size must not exceed 2MB"
        );
      },
      fileType: ([firstFile]) => {
        if (!required) {
          if (!firstFile) return true;
        }
        return (
          ALLOWED_TYPES.includes(firstFile.type) ||
          "Image type must be JPEG/PNG"
        );
      },
      dimensions: async ([firstFile]) => {
        if (!required) {
          if (!firstFile) return true;
        }
        return new Promise((resolve) => {
          const img = new Image();
          const url = URL.createObjectURL(firstFile);
          img.src = url;

          img.onload = () => {
            URL.revokeObjectURL(url);
            const sizeOK =
              img.width < MAX_DIMENSIONS.width &&
              img.height < MAX_DIMENSIONS.height;
            resolve(
              sizeOK ||
                `Image dimensions must not exceed ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels`
            );
          };

          img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve("Image could not be loaded");
          };
        });
      },
    },
  };
}

export default getImgValidation;
