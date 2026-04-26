import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Heading, Text, Icon } from "@components/export/index";
import { type RootState } from "../../store";
import { NotificationService, type NotificationItem } from "../../services/services/notification-service";

export const Messages = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const title = user?.role === "DONOR" ? "Restaurant Messages" : "Volunteer Messages";
    const description = user?.role === "DONOR"
        ? "Conversations with volunteers and operations teams for pickup coordination."
        : "Conversations with restaurants, shelters and dispatch coordinators.";

    useEffect(() => {
        NotificationService.getNotifications()
            .then(setNotifications)
            .finally(() => setLoading(false));
    }, []);

    return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in zoom-in duration-500">
        <Heading headingType="h2" className="text-2xl font-bold text-gray-900">{title}</Heading>
        <Text fontSize="md" className="text-gray-500 -mt-4">{description}</Text>
        {loading && (
            <div className="text-center py-20 bg-white shadow-sm ring-1 ring-gray-100 rounded-[28px]">
                <Text fontSize="lg" className="text-gray-400 font-bold">Loading notifications...</Text>
            </div>
        )}
        {!loading && notifications.length === 0 && (
            <div className="text-center py-20 bg-white shadow-sm ring-1 ring-gray-100 rounded-[28px]">
                <Text fontSize="lg" className="text-gray-400 font-bold">No notifications yet.</Text>
            </div>
        )}
        {!loading && notifications.length > 0 && (
            <div className="bg-white ring-1 ring-gray-100 rounded-2xl divide-y divide-gray-100">
                {notifications.map((item) => (
                    <button
                        type="button"
                        key={item.id}
                        className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors flex items-start gap-3"
                        onClick={() => NotificationService.markAsRead(item.id)}
                    >
                        <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${item.isRead ? "bg-gray-300" : "bg-brand-primary"}`} />
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-600">{item.message}</p>
                        </div>
                        <Icon name="clock" size={14} className="text-gray-400" />
                    </button>
                ))}
            </div>
        )}
    </div>
    );
};

export default Messages;
