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
        <section className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Events</h2>

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