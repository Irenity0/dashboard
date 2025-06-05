import { getEventColorClasses } from "@/components"
import { useEffect, useState } from "react"

// Define the shape of an Event object
interface Event {
  _id: string
  title: string
  start: string
  end: string
  location: string
  color: string
  allDay: boolean
}

const EventsTable = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/events")
        const data: Event[] = await res.json()
        setEvents(data)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      {loading ? (
        <p className="text-sm">Loading events...</p>
      ) : (
        <table className="w-full border text-sm border-collapse overflow-hidden">
          <thead className="text-left bg-zinc-900">
            <tr>
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Start Time</th>
              <th className="border px-2 py-1">End Time</th>
              <th className="border px-2 py-1">Location</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event._id}
                className={`${getEventColorClasses(event.color)} border`}
              >
                <td className="border px-2 py-1">{event.title}</td>
                <td className="border px-2 py-1">
                  {event.allDay ? "All day" : new Date(event.start).toLocaleString()}
                </td>
                <td className="border px-2 py-1">
                  {event.allDay ? "All day" : new Date(event.end).toLocaleString()}
                </td>
                <td className="border px-2 py-1">{event.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default EventsTable