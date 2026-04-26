import { useSelector } from "react-redux";
import { Heading, Text } from "@components/export/index";
import { type RootState } from "../../store";

export const Schedule = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const title = user?.role === "DONOR" ? "Donation Windows" : "My Schedule";
    const description = user?.role === "DONOR"
        ? "Coordinate prep, pickup and packaging windows for your restaurant listings."
        : "Upcoming rescue routing assignments and suggested pickup windows.";

    return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in zoom-in duration-500">
        <Heading headingType="h2" className="text-2xl font-bold text-gray-900">{title}</Heading>
        <div className="text-center py-20 bg-white shadow-sm ring-1 ring-gray-100 rounded-[28px]">
            <Text fontSize="lg" className="text-gray-400 font-bold">{description}</Text>
        </div>
    </div>
    );
};

export default Schedule;
