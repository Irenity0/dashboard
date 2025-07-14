import type { CalendarEvent } from "@/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const useEvents = (email: string) => {
  return useQuery<CalendarEvent[]>({
    queryKey: ['event', email],
    queryFn: async () => {
      const res = await axios.get<CalendarEvent[]>(`${API_BASE_URL}/events`, { params: { email } });
      return res.data;
    },
    enabled: !!email,
    retry: false, // disable retry to prevent infinite loops if server is down
    refetchOnWindowFocus: false,
  });
};

export default useEvents;
