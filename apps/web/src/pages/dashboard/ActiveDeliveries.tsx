import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store";
import { Heading, Text } from "@components/export/index";
import PickupCard from "../../stories/molecule/PickupCard/PickupCard";
import { DashboardService, type NearbyRescue } from "../../services/services/dashboard-service";
import DeliveryMap from "../../components/DeliveryMap";

export const ActiveDeliveries = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [deliveries, setDeliveries] = useState<NearbyRescue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        DashboardService.getNearbyRescuesByRadius(20, user?.location)
            .then(setDeliveries)
            .finally(() => setLoading(false));
    }, [user?.location]);

    const title = user?.role === "DONOR" ? "Donation Feed" : "Active Deliveries";
    const subtitle = user?.role === "DONOR"
        ? "Live opportunities generated from backend donation APIs."
        : "Nearby deliveries your account can claim right now.";

    const center: [number, number] = user?.location
        ? [user.location.latitude, user.location.longitude]
        : [28.6139, 77.209];
    const points = deliveries
        .filter((delivery) => delivery.latitude && delivery.longitude)
        .map((delivery) => ({
            id: delivery.id,
            name: delivery.name,
            latitude: delivery.latitude as number,
            longitude: delivery.longitude as number,
            subtitle: delivery.distance,
        }));

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in zoom-in duration-500">
            <Heading headingType="h2" className="text-2xl font-bold text-gray-900">{title}</Heading>
            <Text fontSize="md" className="text-gray-500 -mt-4">{subtitle}</Text>

            {loading && (
                <div className="text-center py-20 bg-white shadow-sm ring-1 ring-gray-100 rounded-[28px]">
                    <Text fontSize="lg" className="text-gray-400 font-bold">Loading feed...</Text>
                </div>
            )}

            {!loading && deliveries.length === 0 && (
                <div className="text-center py-20 bg-white shadow-sm ring-1 ring-gray-100 rounded-[28px]">
                    <Text fontSize="lg" className="text-gray-400 font-bold">No active deliveries available in your area.</Text>
                </div>
            )}

            {!loading && deliveries.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                    <div className="grid grid-cols-1 gap-5">
                        {deliveries.map((delivery) => (
                            <PickupCard
                                key={delivery.id}
                                name={delivery.name}
                                category={delivery.category}
                                distance={delivery.distance}
                                timeRemaining={delivery.timeRemaining}
                                expiryLabel={delivery.timeRemaining}
                                colorTheme={delivery.colorTheme}
                                onAccept={() => console.log("accepted", delivery.id)}
                            />
                        ))}
                    </div>
                    <div className="h-[420px] rounded-2xl overflow-hidden ring-1 ring-gray-100">
                        <DeliveryMap center={center} points={points} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveDeliveries;
