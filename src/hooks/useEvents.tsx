import type { CalendarEvent } from "@/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const useEvents = (email: string): [CalendarEvent[], boolean, () => void] => {
  const { data = [], isPending: loading, refetch } = useQuery<CalendarEvent[]>({
    queryKey: ['event', email],
    queryFn: async (): Promise<CalendarEvent[]> => {
  const res = await axios.get<CalendarEvent[]>(`${API_BASE_URL}/events`, { params: { email } });
  return res.data;
},
    enabled: !!email,
  });

  return [data, loading, refetch];
};

export default useEvents;