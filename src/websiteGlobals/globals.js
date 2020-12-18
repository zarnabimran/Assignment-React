const globals = {
  API: {
    baseUrl: "http://localhost:8000",
    User: {
      get: { url: "/User/get", method: "Get" },
      Update: { url: "/User/update", method: "Post" },
    },
  },
};

export default globals;
