export type CalendarView = "month" | "week" | "day" | "agenda"

export interface CalendarEvent {
  _id?: string            // Optional – comes from MongoDB
  title: string
  description?: string
  start: Date
  end: Date
  allDay?: boolean
  color?: EventColor
  location?: string
  email: string
}


export type EventColor =
  | "sky"
  | "amber"
  | "violet"
  | "rose"
  | "emerald"
  | "orange"
  | "black"
