import { Bell } from "lucide-react";

type Notification = {
  title: string;
  time: string;
};

type Props = {
  notifications: Notification[];
};

function NotificationPanel({ notifications }: Props) {
  return (
    <div className="bg-[#111827] rounded-3xl border border-gray-800 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-violet-400" size={24} />
        <h2 className="text-2xl font-bold text-white">
          Notifications
        </h2>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-400">
          No notifications yet.
        </p>
      ) : (
        <div className="space-y-4">
          {notifications.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-700 pb-3"
            >
              <p className="text-white">
                {item.title}
              </p>

              <p className="text-gray-500 text-sm">
                {item.time}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationPanel;