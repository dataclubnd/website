import { useEffect, useState } from "react"
import { supabase } from '../services/supabaseClient'

type Event = {
  title: string
  description: string
  time: string
  location: string
}

type Project = {
  company: string
  description: string
  term: string
  year: number
  image: string
}

export default function Archive() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [errorProjects, setErrorProjects] = useState<string | null>(null)

  const [events, setEvents] = useState<Event[]>([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [errorEvents, setErrorEvents] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')

      if (error) {
        setErrorProjects(error.message)
      } else {
        setProjects(data)
      }
      setLoadingProjects(false)
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {

      const now = new Date().toISOString()

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('time', now) 
        .order('time', { ascending: true })

      console.log(data)

      if (error) {
        setErrorEvents(error.message)
      } else {
        setEvents(data)
      }
      setLoadingEvents(false)
    }

    fetchEvents()
  }, [])

  return (
    <>
        <h1 className="text-4xl font-bold mb-6">Archive</h1>
        <section className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>

            {loadingProjects && <p>Loading projects...</p>}

            {!loadingProjects && errorProjects && (
            <p className="text-red-500">{errorProjects}</p>
            )}
        </section>

        <section className="max-w-6xl mx-auto">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
                <div
                    key={index}
                    className="border rounded-lg p-4 shadow-sm"
                >

                <h3 className="text-xl font-semibold">
                {project.company}
                </h3>

                <p className="text-sm text-gray-500">
                {project.term} {project.year}
                </p>

                <p className="mt-2 text-gray-700">
                {project.description}
                </p>

                <img src={project.image}></img>
                </div>
            ))}
            </div>
        </section>

        <section className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Events</h2>

            {loadingEvents && <p>Loading events...</p>}

            {!loadingEvents && errorEvents && (
            <p className="text-red-500">{errorEvents}</p>
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
                {new Date(event.time).toLocaleDateString()}
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