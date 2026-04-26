import { apiClient } from "../apiClient";
import type { User } from "../../types/global";

export interface UserUpdateRequest {
  name?: string;
  phoneNumber?: string;
  latitude?: number;
  longitude?: number;
}

export const userService = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get("/users/me");
    return response.data;
  },

  updateProfile: async (data: UserUpdateRequest) => {
    const response = await apiClient.put("/users/me", data);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await apiClient.delete("/users/me");
    return response.data;
  }
};