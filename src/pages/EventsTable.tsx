import { getEventColorClasses } from "@/components"
import { useAuth } from "@/hooks/useAuth"
import useEvents from "@/hooks/useEvents"

const EventsTable = () => {
  const { user } = useAuth()
  const [events, loading] = useEvents(user!.email!)

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      {loading ? (
        <p className="text-sm">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-zinc-400">You haven’t added any tasks yet {">.<"}</p>
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