import { useEffect, useState } from "react"
import axios from "axios"
import { EventCalendar } from "@/components/event-calendar"
import type { CalendarEvent } from "./types"

const API_BASE_URL = "http://localhost:5000"

export default function Component() {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  // Fetch events on component mount
  useEffect(() => {
    axios
      .get<CalendarEvent[]>(`${API_BASE_URL}/events`)
      .then((response) => {
        setEvents(response.data)
      })
      .catch((error) => {
        console.error("Error fetching events:", error)
      })
  }, [])

  // ADD event (POST)
  const handleEventAdd = async (event: CalendarEvent) => {
    try {
      console.log('from comp')
      const response = await axios.post<{ insertedId: string }>(
        `${API_BASE_URL}/events`,
        event
      )

      const newEvent: CalendarEvent = { ...event, _id: response.data.insertedId }
      setEvents((prev) => [...prev, newEvent])
    } catch (error) {
      console.error("Error adding event:", error)
    }
  }

  // UPDATE event (PUT)
  const handleEventUpdate = async (updatedEvent: CalendarEvent) => {
    try {
      await axios.put(`${API_BASE_URL}/events/${updatedEvent._id}`, updatedEvent)

      setEvents((prev) =>
        prev.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      )
    } catch (error) {
      console.error("Error updating event:", error)
    }
  }

  // DELETE event (DELETE)
  const handleEventDelete = async (eventId: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/events/${eventId}`)
      setEvents((prev) => prev.filter((event) => event._id !== eventId))
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  return (
    <EventCalendar
      events={events}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
    />
  )
}