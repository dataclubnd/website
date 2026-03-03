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
    <div className="bg--white">
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

        <section className="bg--gray-light">
          <div className="max-w-6xl mx-auto p-12 text-center">
            <h3 className=" text-lg md:text-2xl font-bold">
              Interested in joining a project?
            </h3>

            <Link
              to="https://docs.google.com/forms/d/e/1FAIpQLSdKD76jefuYAhrbGf8yLVUGiJIE_jSfXw-t87OdwB7ACxp8zw/viewform?usp=publish-editor"
              className="
                btn btn--cta
                items-center justify-center
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

        <section className="bg-gray-50 border-t border-gray-200">
              <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="
                  flex flex-col gap-6
                  md:flex-row md:items-center md:justify-between
                ">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Already in a project?
                    </h2>
                    <p className="text-gray-600 max-w-xl">
                      We require $5 dues per semester to be involved in our projects. All of this
                      is used for funding in order to provide food in events and have traveling teams.
                    </p>
                  </div>
        
                  <div className="
                    flex flex-col gap-3
                    sm:flex-row
                  ">
                    <Link
                      to="https://www.paypal.com/ncp/payment/KLLKM53LSSZDA"
                      className="
                      btn btn--cta
                      items-center justify-center
                      transition
                      "
                      >
                        Pay Dues
                      </Link>
                  </div>
                </div>
              </div>
            </section>
    </div>
  )
}