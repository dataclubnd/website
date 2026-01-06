import { useEffect, useState } from "react"
import { supabase } from '../services/supabaseClient'
import { Link } from 'react-router-dom'

type Project = {
  company: string
  description: string
  term: string
  year: number
  image: string
  link: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [termFilter, setTermFilter] = useState<string>("All")
  const [yearFilter, setYearFilter] = useState<string>("")
  const [searchFilter, setSearchFilter] = useState<string>("")


  useEffect(() => {
    const fetchProjects = async () => {

      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth() + 1
  
      const currentTerm = currentMonth >= 8 ? "Fall" : "Spring"

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('year', currentYear)
        .eq('term', currentTerm)

      if (error) {
        setError(error.message)
      } else {
        setProjects(data)
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesTerm =
      termFilter === "All" || project.term === termFilter
  
    const matchesYear =
      yearFilter === "" || project.year === Number(yearFilter)
  
    const matchesSearch =
      project.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
      project.description.toLowerCase().includes(searchFilter.toLowerCase())
  
    return matchesTerm && matchesYear && matchesSearch
  })  

  return (
    <>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Projects
          </h1>

          <p className="text-gray-600 text-base md:text-lg mx-auto">
            Data Club projects are semester-long, student-led collaborations where
            members work with real datasets and company partners. Projects span data
            analysis, data engineering, software development, machine learning, and more.
            No prior experience is required. Projects are application-based to ensure
            motivated, balanced teams.
          </p>

            {loading && <p>Loading projects...</p>}

            {!loading && error && (
            <p className="text-red-500">{error}</p>
            )}
        </section>

        <section className="bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-12 text-center">
            <h3 className="text-lg md:text-2xl font-bold mb-4">
              Interested in joining a project?
            </h3>

            <Link
              to="/https://docs.google.com/forms/d/e/1FAIpQLSdU8uHjnIimwaY7V8sMyWHLzZmyZ4IJkEXG9ekol39Qmywiig/viewform?usp=dialog"
              className="
                inline-flex items-center justify-center
                rounded-lg
                bg-[#C99700]
                px-6 py-3
                text-sm md:text-base font-medium
                hover:bg-[#B38600]
                transition
              "
            >
              Apply for Projects
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Current Projects
          </h2>

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
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm w-full"
              />
            </div>
          </div>

          { !loading && !error && filteredProjects.length == 0 && 
              <p className="text-xl">
                No Projects
              </p>
            }

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
                <div
                    key={index}
                    className="border rounded-lg p-4 shadow-sm"
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

                <img src={project.image} alt={project.company} className="mt-3 rounded w-40 mx-auto py-5" />

                </div>
            ))}
            </div>
        </section>
    </>
  )
}