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
  link: string
}

export default function Archive() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [errorProjects, setErrorProjects] = useState<string | null>(null)

  const [events, setEvents] = useState<Event[]>([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [errorEvents, setErrorEvents] = useState<string | null>(null)

  const [dateFilter, setDateFilter] = useState<string>("")
  const [searchEventsFilter, setSearchEventsFilter] = useState<string>("")

  const [termFilter, setTermFilter] = useState<string>("All")
  const [yearFilter, setYearFilter] = useState<string>("")
  const [searchProjectsFilter, setSearchProjectsFilter] = useState<string>("")

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

  const filteredProjects = projects.filter((project) => {
    const matchesTerm =
      termFilter === "All" || project.term === termFilter
  
    const matchesYear =
      yearFilter === "" || project.year === Number(yearFilter)
  
    const matchesSearch =
      project.company.toLowerCase().includes(searchProjectsFilter.toLowerCase()) ||
      project.description.toLowerCase().includes(searchProjectsFilter.toLowerCase())
  
    return matchesTerm && matchesYear && matchesSearch
  })  

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchEventsFilter.toLowerCase()) ||
      event.description.toLowerCase().includes(searchEventsFilter.toLowerCase())
  
    const matchesDate =
      !dateFilter ||
      new Date(event.time) >= new Date(dateFilter)
  
    return matchesSearch && matchesDate
  }) 

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Archive
        </h1>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Projects</h2>

          {!loadingProjects && errorProjects && (
            <p className="text-red-500">{errorProjects}</p>
          )}

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Term
              </label>
              <select
                value={termFilter}
                onChange={(e) => setTermFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm w-full md:w-40"
              >
                <option value="All">All</option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                placeholder="e.g. 2025"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm w-full md:w-32"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Company or description..."
                value={searchProjectsFilter}
                onChange={(e) => setSearchProjectsFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
            </div>
          </div>

          { !loadingProjects && !errorProjects && filteredProjects.length == 0 && 
            <p className="text-xl">
              No Projects
            </p>
          }            

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <div
              key={index}
              className="border rounded-lg p-4 shadow-sm flex flex-col h-full"
            >
              <h3 className="text-xl md:text-2xl font-semibold">
                {project.company}
              </h3>
            
              <p className="text-sm md:text-lg text-gray-500">
                {project.term} {project.year}
              </p>
            
              <p className="mt-2 text-gray-700">
                {project.description}
              </p>
            
              {project.link && project.link.trim() !== "" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-3
                      self-start
                      rounded-lg
                      bg-[#C99700] text-white
                      px-4 py-2
                      text-sm font-medium
                      hover:bg-[#B38600]
                      transition
                    "
                  >
                    See more
                  </a>
                )}
            
              <div className="flex-1 flex items-center justify-center mt-4">
                <img
                  src={project.image}
                  alt={project.company}
                  className="rounded w-40"
                />
              </div>
            </div>
            ))}
          </div>
        </section>

        

        <section className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Events</h2>

            {!loadingEvents && errorEvents && (
              <p className="text-red-500">{errorEvents}</p>
            )}

            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  After Date
                </label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm w-full md:w-44"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Company or description..."
                  value={searchEventsFilter}
                  onChange={(e) => setSearchEventsFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                />
              </div>
            </div>

            { !loadingEvents && !errorEvents && filteredEvents.length == 0 && 
              <p className="text-xl">
                No Events
              </p>
            }

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
                <div
                    key={index}
                    className="border rounded-lg p-4 shadow-sm"
                >

                <h3 className="text-xl font-semibold">
                {event.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                🗓️ {new Date(event.time).toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                })}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                📍 {event.location}
                </p>

                <p className="mt-2 text-gray-700">
                {event.description}
                </p>
                
                </div>
            ))}
            </div>
        </section>
    </section>
  )
}