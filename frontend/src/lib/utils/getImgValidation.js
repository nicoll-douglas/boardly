import config from "@/config";

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
          firstFile.size < config.imgUploads.maxSize ||
          "Image size must not exceed 2MB"
        );
      },
      fileType: ([firstFile]) => {
        if (!required) {
          if (!firstFile) return true;
        }
        return (
          config.imgUploads.allowedTypes.includes(firstFile.type) ||
          "Image type must be JPEG/PNG"
        );
      },
      dimensions: async ([firstFile]) => {
        const maxW = config.imgUploads.maxDimensions.width;
        const maxH = config.imgUploads.maxDimensions.height;

        if (!required) {
          if (!firstFile) return true;
        }
        return new Promise((resolve) => {
          const img = new Image();
          const url = URL.createObjectURL(firstFile);
          img.src = url;

          img.onload = () => {
            URL.revokeObjectURL(url);
            const sizeOK = img.width < maxW && img.height < maxH;
            resolve(
              sizeOK ||
                `Image dimensions must not exceed ${maxW}x${maxH} pixels`
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
