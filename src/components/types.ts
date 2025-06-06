export type CalendarView = "month" | "week" | "day" | "agenda"

export type EventStatus = "todo" | "in-progress" | "done"

export interface CalendarEvent {
  _id?: string
  title: string
  description?: string
  start: Date
  end: Date
  allDay?: boolean
  color?: EventColor
  location?: string
  email: string
  status: EventStatus
}

export type EventColor =
  | "sky"
  | "amber"
  | "violet"
  | "rose"
  | "emerald"
  | "orange"
  | "black"
