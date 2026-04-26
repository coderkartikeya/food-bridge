import { apiClient } from "../apiClient";

interface ApiEnvelope<T> {
  data: T;
  path: string;
  message: string;
}

interface AuthResponsePayload {
  accessToken: string;
  fullName: string;
  role: "VOLUNTEER" | "NGO" | "DONOR" | "ADMIN";
  lat?: number;
  lan?: number;
}

const unwrapResponse = <T>(payload: ApiEnvelope<T> | T): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiEnvelope<T>).data;
  }
  return payload as T;
};

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post<ApiEnvelope<AuthResponsePayload> | AuthResponsePayload>("/auth/login", credentials);
    return unwrapResponse(response.data);
  },

  register: async (userData: any) => {
    const response = await apiClient.post("/auth/register", userData);
    return unwrapResponse(response.data);
  }
};