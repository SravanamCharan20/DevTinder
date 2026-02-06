const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const buildUrl = (path) => `${API_BASE_URL}${path}`;

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  const payload = contentType?.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    const message = payload?.message || payload || "Request failed";
    throw new Error(message);
  }

  return payload;
};

const request = async (path, options = {}) => {
  const config = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  if (config.body && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  if (config.body === undefined) {
    delete config.body;
  }

  return parseResponse(await fetch(buildUrl(path), config));
};

export const signupRequest = (payload) => request(`/auth/signup`, { method: "POST", body: payload });
export const loginRequest = (payload) => request(`/auth/signin`, { method: "POST", body: payload });
export const logoutRequest = () => request(`/auth/logout`, { method: "POST" });
export const fetchProfile = () => request(`/profile/view`);
export const updateProfile = (payload) => request(`/profile/edit`, { method: "PATCH", body: payload });
export const updatePassword = (payload) => request(`/profile/forgetPassword`, { method: "PATCH", body: payload });
export const fetchFeed = (params) => {
  const query = new URLSearchParams(params).toString();
  return request(`/user/feed${query ? `?${query}` : ""}`);
};
export const fetchReceivedRequests = () => request(`/user/request/received`);
export const fetchConnections = () => request(`/user/connections`);
export const sendConnectionRequest = ({ status, toUserId }) =>
  request(`/request/send/${status}/${toUserId}`, { method: "POST" });
export const reviewConnectionRequest = ({ status, requestId }) =>
  request(`/request/review/${status}/${requestId}`, { method: "POST" });
