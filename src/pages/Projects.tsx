import { useEffect, useState } from "react"
import { supabase } from '../services/supabaseClient'

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
        <section className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Projects</h2>

            {loading && <p>Loading projects...</p>}

            {!loading && error && (
            <p className="text-red-500">{error}</p>
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

                <img src={project.image} alt={project.company} className="mt-3 rounded" />

                </div>
            ))}
            </div>
        </section>
    </>
  )
}