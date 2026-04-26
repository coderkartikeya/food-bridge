import { apiClient } from "../apiClient";

export interface DashboardStats {
  mealsDelivered: number;
  co2Saved: string; // e.g., "18kg"
  hoursVolunteered: number;
  mealsTrend: string;
  co2Trend: string;
  hoursTrend: string;
}

export interface NearbyRescue {
  id: string;
  name: string;
  category: string;
  distance: string;
  distanceKm: number;
  timeRemaining: string;
  expiryTime?: string;
  colorTheme: string;
  latitude?: number;
  longitude?: number;
}

export interface ActivePickup {
  id: string;
  restaurantName: string;
  itemsOverview: string;
  timeEstimate: string;
}

export interface HistoryItem {
  id: string;
  date: string;
  restaurant: string;
  shelter: string;
  items: string;
  time: string;
  status: "Delivered" | "Pending";
}

interface ApiEnvelope<T> {
  data: T;
  path: string;
  message: string;
}

interface DonationListItem {
  id: string;
  title: string;
  description: string;
  category: string;
  quantity: number;
  expiryTime: string;
  status: string;
  distance?: string;
}

interface DonationDetail extends DonationListItem {
  donorName?: string;
  latitude?: number;
  longitude?: number;
}

export interface FoodDonationCreatePayload {
  title: string;
  description: string;
  quantity: number;
  expiryTime: string;
  category: "FRESH_PRODUCE" | "COOKED_MEALS" | "BAKED_GOODS" | "PACKAGED_FOOD" | "BEVERAGES" | "DAIRY" | "OTHER";
  latitude: number;
  longitude: number;
}

const colorThemes = ["bg-green-100/50", "bg-blue-100/50", "bg-orange-100/50", "bg-purple-100/50"];

const unwrapResponse = <T>(payload: ApiEnvelope<T> | T): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiEnvelope<T>).data;
  }
  return payload as T;
};

const parseDistanceKm = (distance?: string): number => {
  if (!distance) return Number.POSITIVE_INFINITY;
  const value = Number.parseFloat(distance);
  return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
};

const getTimeRemainingLabel = (expiryTime: string): string => {
  const expiryMs = new Date(expiryTime).getTime();
  const diffMs = expiryMs - Date.now();
  if (Number.isNaN(diffMs)) return "Unknown";
  if (diffMs <= 0) return "Expired";
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 60) return `${diffMinutes}m`;
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
};

const isDonationDetail = (donation: DonationListItem | DonationDetail): donation is DonationDetail => {
  return "latitude" in donation || "longitude" in donation;
};

/**
 * Service to execute all Dashboard related network calls.
 * This directly routes through the axios apiClient configured with token interceptors.
 */
export const DashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<ApiEnvelope<DashboardStats> | DashboardStats>("/dashboard/stats");
    return unwrapResponse(response.data);
  },

  getNearbyRescues: async (): Promise<NearbyRescue[]> => {
    return DashboardService.getNearbyRescuesByRadius(10);
  },

  getNearbyRescuesByRadius: async (
    radiusInKm: number,
    location?: { latitude: number; longitude: number } | null
  ): Promise<NearbyRescue[]> => {
    const response = await apiClient.get<ApiEnvelope<DonationListItem[]> | DonationListItem[]>("/donations", {
      params: {
        lat: location?.latitude,
        lon: location?.longitude,
        radiusInKM: radiusInKm,
      },
    });

    const donations = unwrapResponse(response.data);
    const details = await Promise.all(
      donations.map(async (donation) => {
        try {
          const detailResponse = await apiClient.get<ApiEnvelope<DonationDetail> | DonationDetail>(`/donations/${donation.id}`);
          return unwrapResponse(detailResponse.data);
        } catch {
          return donation;
        }
      })
    );

    return details.map((donation, index) => ({
      id: donation.id,
      name: donation.title,
      category: donation.category,
      distance: donation.distance ?? "N/A",
      distanceKm: parseDistanceKm(donation.distance),
      timeRemaining: getTimeRemainingLabel(donation.expiryTime),
      expiryTime: donation.expiryTime,
      colorTheme: colorThemes[index % colorThemes.length],
      latitude: isDonationDetail(donation) ? donation.latitude : undefined,
      longitude: isDonationDetail(donation) ? donation.longitude : undefined,
    }));
  },

  getActivePickup: async (): Promise<ActivePickup | null> => {
    try {
      const response = await apiClient.get<ApiEnvelope<ActivePickup> | ActivePickup>("/rescues/active");
      return unwrapResponse(response.data);
    } catch {
      return null;
    }
  },

  getHistory: async (): Promise<HistoryItem[]> => {
    try {
      const response = await apiClient.get<ApiEnvelope<HistoryItem[]> | HistoryItem[]>("/dashboard/history");
      return unwrapResponse(response.data);
    } catch {
      return [];
    }
  },

  createDonation: async (payload: FoodDonationCreatePayload): Promise<void> => {
    await apiClient.post("/donations", payload);
  },

  shareVolunteerLocation: async (rescueId: string, location: { latitude: number; longitude: number }): Promise<void> => {
    try {
      await apiClient.post("/rescues/live-location", {
        rescueId,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } catch {
      // Endpoint may not exist yet in local backend. Keep this safe for progressive rollout.
    }
  },
};
