import NotificationRow from "./NotificationRow";

export default function NotificationTable({ notifications, loading, reload }) {
  if (loading) {
    return (
      <div
        className="
          bg-white
          rounded-3xl
          shadow-sm
          p-16
          text-center
          text-slate-500
        "
      >
        Loading notifications...
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div
        className="
          bg-white
          rounded-3xl
          shadow-sm
          p-16
          text-center
        "
      >
        <div className="text-5xl mb-4">🔔</div>

        <h2 className="text-xl font-semibold text-[#0B1F59]">
          No Notifications
        </h2>

        <p className="text-slate-500 mt-2">You're all caught up.</p>
      </div>
    );
  }

  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-sm
        overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
          sticky
          top-0
          z-10
          bg-white
          border-b
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >
        <h2 className="text-lg font-bold text-[#0B1F59]">Notifications</h2>

        <span
          className="
            bg-[#EEF2FF]
            text-[#4F46E5]
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
          "
        >
          {notifications.length}
        </span>
      </div>

      {/* Notification List */}

      <div className="divide-y divide-slate-100">
        {notifications.map((notification) => (
          <NotificationRow
            key={notification.id}
            notification={notification}
            reload={reload}
          />
        ))}
      </div>
    </div>
  );
}
