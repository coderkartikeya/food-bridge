import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Heading, Text, Button } from "@components/export/index";
import { DashboardService, type FoodDonationCreatePayload } from "../../services/services/dashboard-service";
import { type RootState } from "../../store";

const categoryOptions: FoodDonationCreatePayload["category"][] = [
  "FRESH_PRODUCE",
  "COOKED_MEALS",
  "BAKED_GOODS",
  "PACKAGED_FOOD",
  "BEVERAGES",
  "DAIRY",
  "OTHER",
];

const DELHI_LOCATION = { latitude: 28.6139, longitude: 77.209 };

const toDateTimeLocal = (input: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${input.getFullYear()}-${pad(input.getMonth() + 1)}-${pad(input.getDate())}T${pad(input.getHours())}:${pad(input.getMinutes())}`;
};

const ListFood = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [location, setLocation] = useState(user?.location ?? DELHI_LOCATION);
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<Omit<FoodDonationCreatePayload, "latitude" | "longitude">>({
    title: "",
    description: "",
    quantity: 1,
    expiryTime: toDateTimeLocal(new Date(Date.now() + 2 * 60 * 60 * 1000)),
    category: "OTHER",
  });

  useEffect(() => {
    if (user?.location?.latitude && user?.location?.longitude) {
      setLocation(user.location);
      return;
    }

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      () => {
        setLocation(DELHI_LOCATION);
      }
    );
  }, [user?.location]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      await DashboardService.createDonation({
        ...formData,
        latitude: location.latitude,
        longitude: location.longitude,
      });
      setStatus("Food listing created successfully.");
      setFormData((prev) => ({
        ...prev,
        title: "",
        description: "",
        quantity: 1,
      }));
    } catch {
      setStatus("Unable to create food listing right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
      <Heading headingType="h2" className="text-2xl font-bold text-gray-900">List Food</Heading>
      <Text fontSize="sm" className="text-gray-500 -mt-2">
        This form is connected to the backend donations route and uses your detected location (Delhi fallback).
      </Text>

      <form onSubmit={handleSubmit} className="bg-white ring-1 ring-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">Title</label>
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2"
            value={formData.title}
            onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">Description</label>
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 min-h-24"
            value={formData.description}
            onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Quantity</label>
            <input
              type="number"
              min={1}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              value={formData.quantity}
              onChange={(event) => setFormData((prev) => ({ ...prev, quantity: Number(event.target.value) }))}
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Category</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white"
              value={formData.category}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, category: event.target.value as FoodDonationCreatePayload["category"] }))
              }
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">Expiry Time</label>
          <input
            type="datetime-local"
            className="w-full border border-gray-200 rounded-lg px-3 py-2"
            value={formData.expiryTime}
            onChange={(event) => setFormData((prev) => ({ ...prev, expiryTime: event.target.value }))}
            required
          />
        </div>

        <div className="text-xs text-gray-500">
          Pickup area is auto-detected and securely sent with this listing.
        </div>

        <Button type="submit" buttonType="primary" disabled={submitting} className="w-fit px-5 py-2.5">
          {submitting ? "Submitting..." : "Submit Listing"}
        </Button>

        {status && <Text fontSize="sm" className={status.includes("Unable") ? "text-red-600" : "text-green-700"}>{status}</Text>}
      </form>
    </div>
  );
};

export default ListFood;
