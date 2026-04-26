import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";

type MapPoint = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  subtitle?: string;
};

interface DeliveryMapProps {
  center: [number, number];
  points: MapPoint[];
  zoom?: number;
}

const DeliveryMap = ({ center, points, zoom = 13 }: DeliveryMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);

  const filteredPoints = useMemo(
    () => points.filter((point) => Number.isFinite(point.latitude) && Number.isFinite(point.longitude)),
    [points]
  );

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView(center, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    leafletMapRef.current = map;
    markerLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      leafletMapRef.current = null;
      markerLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = leafletMapRef.current;
    const markerLayer = markerLayerRef.current;
    if (!map || !markerLayer) return;

    map.setView(center, zoom);
    markerLayer.clearLayers();

    const userMarker = L.circleMarker(center, {
      radius: 7,
      color: "#1D4ED8",
      fillColor: "#3B82F6",
      fillOpacity: 0.9,
      weight: 2,
    }).bindPopup("Your current location");
    markerLayer.addLayer(userMarker);

    filteredPoints.forEach((point) => {
      const marker = L.circleMarker([point.latitude, point.longitude], {
        radius: 7,
        color: "#0F8F3B",
        fillColor: "#22C55E",
        fillOpacity: 0.9,
        weight: 2,
      }).bindPopup(`<strong>${point.name}</strong>${point.subtitle ? `<br/>${point.subtitle}` : ""}`);
      markerLayer.addLayer(marker);
    });
  }, [center, zoom, filteredPoints]);

  return (
    <div className="relative w-full h-full bg-gray-100">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute bottom-3 right-3 bg-white/95 rounded-lg px-3 py-2 text-[11px] text-gray-700 shadow">
        Blue: You, Green: Deliveries ({filteredPoints.length})
      </div>
    </div>
  );
};

export default DeliveryMap;

