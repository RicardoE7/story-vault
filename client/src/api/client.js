const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const getToken = () => {
  return localStorage.getItem("storyVaultToken");
};

const request = async (path, options = {}) => {
  const token = getToken();

  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
};

export { API_URL, request };
