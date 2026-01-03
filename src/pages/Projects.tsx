import { useEffect, useState } from "react"
import { supabase } from '../services/supabaseClient'
import { Link } from 'react-router-dom'

type Project = {
  company: string
  description: string
  term: string
  year: number
  image: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
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

                <img src={project.image} alt={project.company} className="mt-3 rounded w-40 mx-auto py-5" />

                </div>
            ))}
            </div>
        </section>
    </>
  )
}