import { useEffect, useState } from "react"
import { supabase } from '../services/supabaseClient'

type Event = {
  title: string
  description: string
  time: string
  location: string
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {

      const now = new Date().toISOString()

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('time', now) 
        .order('time', { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setEvents(data)
      }
      setLoading(false)
    }

    fetchEvents()
  }, [])

  return (
    <>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Events
          </h1>

          <p className="text-gray-600 text-base md:text-lg mx-auto">
            Data Club projects are semester-long, student-led collaborations where
            members work with real datasets and company partners. Projects span data
            analysis, data engineering, software development, machine learning, and more.
            No prior experience is required. Projects are application-based to ensure
            motivated, balanced teams.
          </p>

            {loading && <p>Loading events...</p>}

            {!loading && error && (
            <p className="text-red-500">{error}</p>
            )}
        </section>

        <section className="max-w-6xl mx-auto">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
                <div
                    key={index}
                    className="border rounded-lg p-4 shadow-sm"
                >

                <h3 className="text-xl font-semibold">
                {event.title}
                </h3>

                <p className="text-sm text-gray-500">
                {new Date(event.time).toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                })}
                </p>

                <p className="mt-2 text-gray-700">
                {event.description}
                </p>
                
                </div>
            ))}
            </div>
        </section>
    </>
  )
}