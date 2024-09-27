const config = {
  auth: {
    accessTime: 5 * 60 * 1000,
  },
  fetch: {
    queriesEnabled: false,
    privilegeEnabled: false,
  },
  userPrivilege: {
    basic: 0,
    self: 1,
    admin: 2,
  },
  imgUploads: {
    maxSize: 2 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png"],
    maxDimensions: { width: 500, height: 500 },
  },
};

export default config;
