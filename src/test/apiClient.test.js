import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("axios", () => {
  const mockAxiosInstance = vi.fn();

  mockAxiosInstance.interceptors = {
    request: {
      use: vi.fn(),
    },
    response: {
      use: vi.fn(),
    },
  };

  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
      post: vi.fn(),
    },
  };
});

describe("apiClient", () => {
  let apiClient;
  let requestInterceptor;
  let responseSuccessInterceptor;
  let responseErrorInterceptor;
  let mockAxiosInstance;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    localStorage.clear();
    sessionStorage.clear();

    Object.defineProperty(import.meta, "env", {
      value: {
        VITE_API_BASE_URL: "http://localhost:8080",
      },
      configurable: true,
    });

    const module = await import("../services/apiClient");

    apiClient = module.default;

    mockAxiosInstance = axios.create.mock.results[0].value;

    requestInterceptor =
      mockAxiosInstance.interceptors.request.use.mock.calls[0][0];

    responseSuccessInterceptor =
      mockAxiosInstance.interceptors.response.use.mock.calls[0][0];

    responseErrorInterceptor =
      mockAxiosInstance.interceptors.response.use.mock.calls[0][1];

    axios.post.mockClear();
    mockAxiosInstance.mockClear();
  });

  it("creates axios instance", () => {
    expect(axios.create).toHaveBeenCalled();
  });

  it("adds authorization header when token exists", async () => {
    sessionStorage.setItem("accessToken", "test-token");

    const config = {
      headers: {},
    };

    const result = await requestInterceptor(config);

    expect(result.headers.Authorization).toBe("Bearer test-token");
  });

  it("does not add authorization header when token missing", async () => {
    const config = {
      headers: {},
    };

    const result = await requestInterceptor(config);

    expect(result.headers.Authorization).toBeUndefined();
  });

  it("returns response in success interceptor", () => {
    const response = {
      data: {
        success: true,
      },
    };

    expect(responseSuccessInterceptor(response)).toEqual(response);
  });

  it("rejects non-401 errors", async () => {
    const error = {
      response: {
        status: 500,
      },
      config: {},
    };

    await expect(responseErrorInterceptor(error)).rejects.toEqual(error);
  });

  it("refreshes token and retries request on 401", async () => {
    sessionStorage.setItem("refreshToken", "refresh-token");

    axios.post.mockResolvedValue({
      data: {
        details: "new-access-token",
      },
    });

    mockAxiosInstance.mockResolvedValue({
      data: {
        success: true,
      },
    });

    const error = {
      response: {
        status: 401,
      },
      config: {
        headers: {},
      },
    };

    const response = await responseErrorInterceptor(error);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/user/refresh",
      null,
      {
        params: {
          refreshToken: "refresh-token",
        },
      },
    );

    expect(sessionStorage.getItem("accessToken")).toBe("new-access-token");

    expect(mockAxiosInstance).toHaveBeenCalledTimes(1);

    expect(response).toEqual({
      data: {
        success: true,
      },
    });
  });

  it("clears storage when refresh token fails", async () => {
    sessionStorage.setItem("refreshToken", "bad-token");
    sessionStorage.setItem("accessToken", "old-token");

    const dispatchSpy = vi.spyOn(window, "dispatchEvent");

    axios.post.mockRejectedValue(new Error("Refresh Failed"));

    const error = {
      response: {
        status: 401,
      },
      config: {
        headers: {},
      },
    };

    await expect(responseErrorInterceptor(error)).rejects.toThrow(
      "Refresh Failed",
    );

    expect(sessionStorage.getItem("accessToken")).toBeNull();
    expect(sessionStorage.getItem("refreshToken")).toBeNull();

    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Event));
  });

  it("does not retry request twice", async () => {
    const error = {
      response: {
        status: 401,
      },
      config: {
        _retry: true,
      },
    };

    await expect(responseErrorInterceptor(error)).rejects.toEqual(error);

    expect(axios.post).not.toHaveBeenCalled();
  });
});
