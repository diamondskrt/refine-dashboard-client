import axios, { AxiosRequestConfig } from "axios";

import { AuthBindings } from "@refinedev/core";

import { parseJwt } from "@/utils/parse-jwt";
import { CredentialResponse } from "@/interfaces/google";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

export const authProvider: AuthBindings = {
  login: async ({ credential }: CredentialResponse) => {
    const profileObj = credential ? await parseJwt(credential) : null;

    if (!profileObj) {
      return {
        success: false,
      };
    }

    try {
      const res = await axiosInstance.post("/v1/users", {
        name: profileObj.name,
        email: profileObj.email,
        avatar: profileObj.picture,
      });

      const data = res.data;

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...profileObj,
          avatar: profileObj.picture,
          id: data._id,
        })
      );
    } catch (error) {
      console.log(error);

      return {
        success: false,
      };
    }

    localStorage.setItem("token", `${credential}`);

    return {
      success: true,
      redirectTo: "/",
    };
  },
  logout: async () => {
    const token = localStorage.getItem("token");

    if (token && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      axios.defaults.headers.common = {};
      window.google?.accounts.id.revoke(token, () => {
        return {};
      });
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);

    return { error };
  },
  check: async () => {
    const token = localStorage.getItem("token");

    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Token not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }

    return null;
  },
};
