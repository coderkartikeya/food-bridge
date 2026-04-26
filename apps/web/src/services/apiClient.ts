import axios from "axios";
import { store } from "../store/index";
import { logout, setCredentials } from "../store/slices/authSlice";

interface ApiEnvelope<T> {
  data: T;
  path: string;
  message: string;
}

interface AuthPayload {
  accessToken: string;
  fullName?: string;
  role?: string;
  lat?: number;
  lan?: number;
}

const unwrapResponse = <T>(payload: ApiEnvelope<T> | T): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiEnvelope<T>).data;
  }
  return payload as T;
};

export const apiClient = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If the server returns 401 and we haven't already retried this request
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post<ApiEnvelope<AuthPayload> | AuthPayload>(
          "http://localhost:4000/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );
        const authData = unwrapResponse(res.data);
        const currentUser = store.getState().auth.user;
        if (!authData.accessToken || !currentUser) {
          store.dispatch(logout());
          return Promise.reject(error);
        }

        store.dispatch(
          setCredentials({
            user: currentUser,
            accessToken: authData.accessToken,
          })
        );

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${authData.accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);