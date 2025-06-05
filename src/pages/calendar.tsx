import { useEffect, useState } from "react"
import axios from "axios"
import { EventCalendar, type CalendarEvent } from "@/components"

const API_BASE_URL = "http://localhost:5000"

export default function Component() {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  // 🔹 Fetch events on mount
  useEffect(() => {
    axios.get<CalendarEvent[]>(`${API_BASE_URL}/events`)
      .then((response) => {
        setEvents(response.data)
      })
      .catch((error) => {
        console.error("Error fetching events:", error)
      })
  }, [])

  // 🔹 POST: Add a new event
  const handleEventAdd = async (event: CalendarEvent) => {
    try {
      console.log('checking')
      const response = await axios.post<{ insertedId: string }>(
        `${API_BASE_URL}/events`,
        event
      )

      // Append new event with inserted ID
      const newEvent: CalendarEvent = { ...event, _id: response.data.insertedId }
      setEvents((prev) => [...prev, newEvent])
    } catch (error) {
      console.error("Error adding event:", error)
    }
  }

  // 🔹 PUT: Update an event
  const handleEventUpdate = async (updatedEvent: CalendarEvent) => {
    try {
      console.log(updatedEvent._id)
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

  // 🔹 DELETE: Remove an event
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