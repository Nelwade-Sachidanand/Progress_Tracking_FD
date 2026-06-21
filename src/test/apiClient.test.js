import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("axios", () => {
  const mockAxiosInstance = {
    interceptors: {
      request: {
        use: vi.fn(),
      },
      response: {
        use: vi.fn(),
      },
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

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    localStorage.clear();

    Object.defineProperty(import.meta, "env", {
      value: {
        VITE_API_BASE_URL: "http://localhost:8080",
      },
      configurable: true,
    });

    const module = await import("../services/apiClient");

    apiClient = module.default;

    requestInterceptor =
      axios.create.mock.results[0].value.interceptors.request.use.mock
        .calls[0][0];

    responseSuccessInterceptor =
      axios.create.mock.results[0].value.interceptors.response.use.mock
        .calls[0][0];

    responseErrorInterceptor =
      axios.create.mock.results[0].value.interceptors.response.use.mock
        .calls[0][1];

    axios.post.mockClear();
  });

  it("creates axios instance", () => {
    expect(axios.create).toHaveBeenCalled();
  });

  it("adds authorization header when token exists", async () => {
    localStorage.setItem("accessToken", "test-token");

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
    localStorage.setItem("refreshToken", "refresh-token");

    axios.post.mockResolvedValue({
      data: {
        details: "new-access-token",
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

    await expect(responseErrorInterceptor(error)).rejects.toBeDefined();

    expect(axios.post).toHaveBeenCalledTimes(1);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/user/refresh",
      null,
      {
        params: {
          refreshToken: "refresh-token",
        },
      },
    );
  });

  it("clears storage when refresh token fails", async () => {
    localStorage.setItem("refreshToken", "bad-token");

    localStorage.setItem("accessToken", "old-token");

    const dispatchSpy = vi.spyOn(window, "dispatchEvent");

    axios.post.mockRejectedValue(new Error("Refresh Failed"));

    const error = {
      response: {
        status: 401,
      },
      config: {},
    };

    await expect(responseErrorInterceptor(error)).rejects.toThrow(
      "Refresh Failed",
    );

    expect(localStorage.getItem("accessToken")).toBeNull();

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("does not retry request twice", async () => {
    axios.post.mockClear();

    const error = {
      response: {
        status: 401,
      },
      config: {
        _retry: true,
      },
    };

    await expect(responseErrorInterceptor(error)).rejects.toEqual(error);

    expect(axios.post).toHaveBeenCalledTimes(0);
  });
});
