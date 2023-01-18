const beforeRequestHookGot = (accessToken) => [
  (options) => {
    if (accessToken) {
      options.headers.Authorization = "Bearer " + accessToken;
    }
  },
];

export const gotConfig = {
  beforeRequestHookGot: beforeRequestHookGot,
  headerJSON: { "Content-Type": "application/json" },
  responseJSON: "json",
};
