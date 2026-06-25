import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NotificationFilters from "../components/NotificationFilters";
import NotificationTable from "../components/NotificationTable";

import {
  getNotifications,
  markAllRead,
} from "../../../services/notificationService";

export default function NotificationPage() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const response = await getNotifications();

      setNotifications(response.details || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const filteredNotifications = notifications.filter((notification) => {
    const keyword = search.toLowerCase();

    return (
      notification.title?.toLowerCase().includes(keyword) ||
      notification.message?.toLowerCase().includes(keyword) ||
      notification.type?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="p-8">
      <NotificationFilters
        search={search}
        setSearch={setSearch}
        onMarkAll={async () => {
          await markAllRead();
          loadNotifications();
        }}
      />

      <NotificationTable
        loading={loading}
        notifications={filteredNotifications}
        reload={loadNotifications}
      />
    </div>
  );
}
