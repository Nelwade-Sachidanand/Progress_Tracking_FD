import { Bell, CheckCircle, Eye, RotateCcw, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { markAsRead } from "../../../services/notificationService";

export default function NotificationRow({ notification, reload }) {
  const navigate = useNavigate();

  const openNotification = async () => {
    try {
      if (!notification.read) {
        await markAsRead(notification.id);
        reload();
      }

      if (notification.redirectUrl) {
        navigate(notification.redirectUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case "APPROVED":
        return <CheckCircle size={22} className="text-green-600" />;

      case "REJECTED":
        return <XCircle size={22} className="text-red-600" />;

      case "ROLLED_BACK":
        return <RotateCcw size={22} className="text-amber-600" />;

      default:
        return <Bell size={22} className="text-blue-600" />;
    }
  };

  const getBadgeColor = () => {
    switch (notification.type) {
      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "ROLLED_BACK":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div
      onClick={openNotification}
      className="
        flex
        items-start
        justify-between
        gap-5
        px-6
        py-5
        hover:bg-slate-50
        transition-all
        cursor-pointer
      "
    >
      {/* Left */}

      <div className="flex gap-4 flex-1">
        <div
          className="
            h-12
            w-12
            rounded-2xl
            bg-slate-100
            flex
            items-center
            justify-center
            flex-shrink-0
          "
        >
          {getIcon()}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            {!notification.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            )}

            <h3
              className="
                font-semibold
                text-[#0B1F59]
                text-[15px]
              "
            >
              {notification.title}
            </h3>

            <span
              className={`
                px-3
                py-1
                rounded-full
                text-[11px]
                font-semibold
                ${getBadgeColor()}
              `}
            >
              {notification.type}
            </span>
          </div>

          <p
            className="
              mt-2
              text-sm
              text-slate-600
              leading-6
            "
          >
            {notification.message}
          </p>
        </div>
      </div>

      {/* Right */}

      <div
        className="
          flex
          flex-col
          items-end
          justify-between
          gap-4
          min-w-[120px]
        "
      >
        <span
          className="
            text-xs
            text-slate-400
            whitespace-nowrap
          "
        >
          {notification.timeAgo}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openNotification();
          }}
          className="
            flex
            items-center
            gap-2
            px-3
            py-2
            rounded-xl
            border
            border-slate-200
            hover:bg-[#EEF2FF]
            hover:border-[#6D4AFF]
            transition
            text-[#6D4AFF]
            cursor-pointer
          "
        >
          <Eye size={16} />
          <span className="text-sm font-medium">View</span>
        </button>
      </div>
    </div>
  );
}
