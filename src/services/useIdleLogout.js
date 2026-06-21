import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const IDLE_TIME = 5 * 60 * 1000; // 1 minute for testing

export default function useIdleLogout() {
  const navigate = useNavigate();

  const timerRef = useRef(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    // Do not start idle timer if user is not logged in
    if (!accessToken) {
      return;
    }

    const logout = () => {
      localStorage.clear();

      navigate("/", {
        replace: true,
        state: {
          showSessionModal: true,
          message: "Session expired due to inactivity. Please login again.",
        },
      });
    };

    const resetTimer = () => {
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(logout, IDLE_TIME);
    };

    const events = [
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keydown",
      "touchstart",
    ];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timerRef.current);

      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate]);
}
