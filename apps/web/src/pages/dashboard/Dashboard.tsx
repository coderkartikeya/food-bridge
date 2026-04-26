import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type RootState } from "../../store";
import { Heading, Text, Icon, Button } from "@components/export/index";
import PickupCard from "../../stories/molecule/PickupCard/PickupCard";
import { DashboardService, type NearbyRescue, type ActivePickup } from "../../services/services/dashboard-service";
import DeliveryMap from "../../components/DeliveryMap";

const nearbyFilterOptions = [5, 10, 20, 50] as const;
const DELHI_FALLBACK: [number, number] = [28.6139, 77.209];

type Coordinates = { latitude: number; longitude: number };

const useLiveUserLocation = (storedLocation: Coordinates | null | undefined) => {
  const [resolvedLocation, setResolvedLocation] = useState<Coordinates | null>(storedLocation ?? null);

  useEffect(() => {
    if (storedLocation?.latitude && storedLocation?.longitude) return;

    if (!navigator.geolocation) {
      setResolvedLocation({ latitude: DELHI_FALLBACK[0], longitude: DELHI_FALLBACK[1] });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setResolvedLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setResolvedLocation({ latitude: DELHI_FALLBACK[0], longitude: DELHI_FALLBACK[1] });
      }
    );
  }, [storedLocation]);

  return storedLocation?.latitude && storedLocation?.longitude ? storedLocation : resolvedLocation;
};

interface DashboardByRoleProps {
  roleTitle: string;
  showListFoodAction?: boolean;
}

const DashboardByRole = ({ roleTitle, showListFoodAction = false }: DashboardByRoleProps) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [nearby, setNearby] = useState<NearbyRescue[]>([]);
  const [activePickup, setActivePickup] = useState<ActivePickup | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<(typeof nearbyFilterOptions)[number]>(10);
  const [activeLoading, setActiveLoading] = useState(false);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolvedLocation = useLiveUserLocation(user?.location ?? null);
  const mapCenter: [number, number] = resolvedLocation
    ? [resolvedLocation.latitude, resolvedLocation.longitude]
    : DELHI_FALLBACK;
  const mapPoints = useMemo(
    () =>
      nearby
        .filter((pickup) => pickup.latitude && pickup.longitude)
        .map((pickup) => ({
          id: pickup.id,
          name: pickup.name,
          latitude: pickup.latitude as number,
          longitude: pickup.longitude as number,
          subtitle: `${pickup.distance} away`,
        })),
    [nearby]
  );

  useEffect(() => {
    const fetchData = async () => {
      setActiveLoading(true);
      try {
        const activeData = await DashboardService.getActivePickup();
        setActivePickup(activeData);
      } catch {
        setError("Unable to load active pickup right now.");
      } finally {
        setActiveLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchNearby = async () => {
      setNearbyLoading(true);
      setError(null);
      try {
        const nearbyData = await DashboardService.getNearbyRescuesByRadius(selectedRadius, resolvedLocation);
        setNearby(nearbyData);
      } catch {
        setNearby([]);
        setError("Unable to fetch nearby deliveries from backend.");
      } finally {
        setNearbyLoading(false);
      }
    };
    if (resolvedLocation) fetchNearby();
  }, [selectedRadius, resolvedLocation]);

  useEffect(() => {
    if (user?.role !== "VOLUNTEER" || !activePickup?.id || !navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition((position) => {
      DashboardService.shareVolunteerLocation(activePickup.id, {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    return () => navigator.geolocation.clearWatch(watchId);
  }, [user?.role, activePickup?.id]);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in zoom-in duration-500">
      <div className="flex items-center justify-between">
        <Heading headingType="h2" className="text-2xl font-bold text-gray-900 tracking-tight">
          {roleTitle}
        </Heading>
        {showListFoodAction && (
          <Button buttonType="primary" onClick={() => navigate("/dashboard/list-food")} className="px-5 py-2.5 text-sm">
            List Food
          </Button>
        )}
      </div>

      {activeLoading && <Text fontSize="md" className="text-gray-500">Loading active assignment...</Text>}

      {activePickup && !activeLoading && (
      <div className="relative overflow-hidden bg-brand-primary rounded-[28px] p-6 md:p-10 shadow-lg text-white flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div className="flex flex-col items-start gap-4">
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border border-white/30">
            In Progress
          </div>
          <div>
            <Heading headingType="h2" className="text-3xl md:text-4xl font-extrabold mb-3">
              Active Pickup: {activePickup.restaurantName}
            </Heading>
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <Icon name="shoppingBag" size={18} />
              <Text fontSize="md" className="font-medium">{activePickup.itemsOverview}</Text>
            </div>
            <div className="flex items-center gap-2 opacity-90">
              <Icon name="clock" size={18} />
              <Text fontSize="md" className="font-medium">{activePickup.timeEstimate}</Text>
            </div>
          </div>
        </div>
        <Button buttonType="secondary" className="bg-white text-brand-primary tracking-wide font-bold hover:bg-gray-50 uppercase text-sm px-6 py-4 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shrink-0 border-none">
          <Icon name="navigation" size={18} />
          Navigate to Pickup
        </Button>
      </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <Text fontSize="sm" className="text-gray-600">
          Meals delivered analytics will be enabled after dedicated stats routes are finalized.
        </Text>
      </div>

      <div className="flex flex-col gap-6 mt-2">
        <div className="flex items-center justify-between">
          <Heading headingType="h2" className="text-2xl font-bold text-gray-900 tracking-tight">
            Rescues Nearby
          </Heading>
          <div className="flex flex-wrap gap-2">
            {nearbyFilterOptions.map((radius) => (
              <Button
                key={radius}
                buttonType="tertiary"
                onClick={() => setSelectedRadius(radius)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  selectedRadius === radius
                    ? "bg-brand-primary text-white border-brand-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {radius} km
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[600px]">
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
            {nearbyLoading && <span className="text-gray-400">Loading nearby rescues...</span>}
            {error && <span className="text-red-500">{error}</span>}
            {nearby.map((pickup) => (
              <PickupCard 
                key={pickup.id}
                name={pickup.name}
                category={pickup.category}
                distance={pickup.distance}
                timeRemaining={pickup.timeRemaining}
                expiryLabel={pickup.timeRemaining}
                colorTheme={pickup.colorTheme}
                onAccept={() => console.log('Accepted', pickup.id)}
              />
            ))}
            {!nearbyLoading && nearby.length === 0 && <span className="text-gray-400">No rescues available in this radius.</span>}
          </div>

          <div className="relative w-full h-[400px] lg:h-full rounded-[24px] overflow-hidden ring-1 ring-gray-200">
            <DeliveryMap center={mapCenter} points={mapPoints} />
            <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-md font-bold text-xs flex items-center gap-2 text-gray-700 z-[500]">
              <span className="w-2.5 h-2.5 bg-brand-primary rounded-full animate-pulse" />Service Radius: {selectedRadius} km
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 rounded-xl shadow-md p-3 z-[500]">
              <p className="text-xs font-semibold text-gray-700 mb-1">Pinned deliveries in selected radius</p>
              <div className="text-xs text-gray-600 max-h-20 overflow-auto">
                {mapPoints.slice(0, 3).map((pickup) => (
                  <p key={pickup.id}>
                    {pickup.name} - {pickup.subtitle}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DonorDashboard = () => {
  return <DashboardByRole roleTitle="Restaurant Dashboard" showListFoodAction />;
};

const NgoDashboard = () => {
  return <DashboardByRole roleTitle="NGO Dashboard" showListFoodAction />;
};

const VolunteerDashboard = () => {
  return <DashboardByRole roleTitle="Volunteer Dashboard" />;
};

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  switch (user?.role) {
    case "DONOR":
      return <DonorDashboard />;
    case "NGO":
      return <NgoDashboard />;
    default:
      return <VolunteerDashboard />;
  }
};

export default Dashboard;