import axios from "axios";

// console.log(import.meta.env.VITE_API_BASE_URL);

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("Response Error:", error.response?.status);

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Trying refresh token...");

      originalRequest._retry = true;

      try {
        const refreshToken = sessionStorage.getItem("refreshToken");

        console.log("Refresh Token:", refreshToken);

        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user/refresh`,
          null,
          {
            params: {
              refreshToken,
            },
          },
        );

        console.log("Refresh Success");

        console.log("Refresh Response:", refreshResponse.data);

        const newAccessToken = refreshResponse.data.details;

        sessionStorage.setItem("accessToken", newAccessToken);

        return apiClient({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } catch (e) {
        console.log("Refresh Failed", e);

        sessionStorage.clear();

        window.dispatchEvent(new Event("session-expired"));

        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
