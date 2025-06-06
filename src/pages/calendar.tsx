import { useEffect, useState } from "react";
import axios from "axios";
import { EventCalendar, type CalendarEvent } from "@/components";
import useEvents from "@/hooks/useEvents";
import { useAuth } from "@/hooks/useAuth";

const API_BASE_URL = "http://localhost:5000";

export default function Component() {
  const { user } = useAuth();
  const email = user?.email;

  const [events] = useEvents(email!);
  const [localEvents, setLocalEvents] = useState<CalendarEvent[]>([]);

  // 🔹 Update local state when events change
  useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  // 🔹 POST: Add a new event
  const handleEventAdd = async (event: CalendarEvent) => {
    if (!email) return console.error("Missing email");

    try {
      const response = await axios.post<{ insertedId: string }>(
        `${API_BASE_URL}/events`,
        { ...event, email }
      );

      const newEvent: CalendarEvent = {
        ...event,
        _id: response.data.insertedId,
        email,
      };

      setLocalEvents((prev) => [...prev, newEvent]);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // 🔹 PUT: Update an event
  const handleEventUpdate = async (updatedEvent: CalendarEvent) => {
    try {
      await axios.put(`${API_BASE_URL}/events/${updatedEvent._id}`, updatedEvent);
      setLocalEvents((prev) =>
        prev.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // 🔹 DELETE: Remove an event
  const handleEventDelete = async (eventId: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/events/${eventId}`);
      setLocalEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <EventCalendar
      events={localEvents}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
    />
  );
}