import { apiClient } from "../apiClient";

export type NotificationType = "donation" | "pickup" | "system";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  type: NotificationType;
  relatedId?: string;
}

interface ApiEnvelope<T> {
  data: T;
}

interface NotificationApiItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  type?: NotificationType;
  relatedId?: string;
}

interface DonationFeedItem {
  id: string;
  title: string;
  distance?: string;
  expiryTime?: string;
}

const unwrap = <T>(payload: ApiEnvelope<T> | T): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiEnvelope<T>).data;
  }
  return payload as T;
};

const mapNotification = (item: NotificationApiItem): NotificationItem => ({
  id: item.id,
  title: item.title,
  message: item.message,
  createdAt: item.createdAt,
  isRead: item.read,
  type: item.type ?? "system",
  relatedId: item.relatedId,
});

const mapFallbackFromDonation = (item: DonationFeedItem, index: number): NotificationItem => ({
  id: `fallback-${item.id}`,
  title: "New nearby donation",
  message: `${item.title} is available${item.distance ? ` (${item.distance})` : ""}.`,
  createdAt: item.expiryTime ?? new Date(Date.now() - index * 5 * 60 * 1000).toISOString(),
  isRead: false,
  type: "donation",
  relatedId: item.id,
});

export const NotificationService = {
  getNotifications: async (): Promise<NotificationItem[]> => {
    try {
      const response = await apiClient.get<ApiEnvelope<NotificationApiItem[]> | NotificationApiItem[]>("/notifications");
      return unwrap(response.data).map(mapNotification);
    } catch {
      // Temporary fallback until dedicated notifications pipeline is live (Kafka/WebSocket later).
      const donationsResponse = await apiClient.get<ApiEnvelope<DonationFeedItem[]> | DonationFeedItem[]>("/donations");
      return unwrap(donationsResponse.data).slice(0, 10).map(mapFallbackFromDonation);
    }
  },

  markAsRead: async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/notifications/${id}/read`);
    } catch {
      // Ignore in fallback mode.
    }
  },
};

