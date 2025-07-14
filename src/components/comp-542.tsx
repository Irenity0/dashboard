import { useState, useEffect } from "react";
import axios from "axios";
import { EventCalendar } from "@/components/event-calendar";
import type { CalendarEvent } from "./types";
import { useAuth } from "@/hooks/useAuth";
import useEvents from "@/hooks/useEvents"; // import your custom hook

const API_BASE_URL = "https://dashboard-server-jet.vercel.app";

export default function Component() {
  const { user } = useAuth();           // { email?: string }
  const email = user?.email;

  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // ✅ Use the custom useEvents hook
const { data: fetchedEvents } = useEvents(email as string);


  // 🧠 Sync fetchedEvents into local state
useEffect(() => {
  if (fetchedEvents) {
    setEvents(fetchedEvents);
  }
}, [fetchedEvents]);

  /* ───────────────────────────────
     ADD  – include email in body
     ─────────────────────────────── */
  const handleEventAdd = async (event: CalendarEvent) => {
    if (!email) {
      console.error("Cannot add event: email is undefined");
      return;
    }

    try {
      const res = await axios.post<{ insertedId: string }>(
        `${API_BASE_URL}/events`,
        { ...event, email }
      );

      const newEvent: CalendarEvent = {
        ...event,
        _id: res.data.insertedId,
        email,
      };

      setEvents((prev) => [...prev, newEvent]);
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  /* ───────────────────────────────
     UPDATE
     ─────────────────────────────── */
  const handleEventUpdate = async (updated: CalendarEvent) => {
    try {
      await axios.put(`${API_BASE_URL}/events/${updated._id}`, updated);
      setEvents((prev) =>
        prev.map((e) => (e._id === updated._id ? updated : e))
      );
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  /* ───────────────────────────────
     DELETE
     ─────────────────────────────── */
  const handleEventDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/events/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <EventCalendar
      events={events}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
    />
  );
}