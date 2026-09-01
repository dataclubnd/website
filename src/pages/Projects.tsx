import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import projectsData from "../content/projects.json"

type Project = {
  title: string
  description: string
  term: string
  year: string
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

  // Dynamically import all images from the assets folder
  const images = import.meta.glob("../content/assets/*", { eager: true });

  const resolveImage = (imageName: string) => {
    const imagePath = `../content/assets/${imageName}`;
    if (images[imagePath]) {
      return (images[imagePath] as any).default; // Access the default export of the image
    } else {
      console.error(`Image not found: ${imageName}`);
      return ""; // Return an empty string if the image is not found
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {

      try {
        const now = new Date()
        const currentYear = now.getFullYear()
        const currentMonth = now.getMonth() + 1
    
        const currentTerm = currentMonth >= 8 ? "Fall" : "Spring"

          // Filter projects based on the current year and term
          const filteredData = projectsData.filter(
            (project: { year: string; term: string }) =>
              project.year === currentYear.toString() && project.term === currentTerm
          );

        setProjects(filteredData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects()
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesTerm =
      termFilter === "All" || project.term === termFilter
  
    const matchesYear =
      yearFilter === "" || project.year === yearFilter
  
    const matchesSearch =
      project.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
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
              to=""
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
              Apply for Projects (coming soon)
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
                {project.title}
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
                  src={resolveImage(project.image)}
                  alt={project.title}
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
                        inline-flex items-center justify-center
                        whitespace-nowrap
                        rounded-lg
                        bg-[#C99700]
                        px-6 py-3
                        md: px-20
                        text-sm md:text-base font-medium
                        hover:bg-[#B38600]
                        transition
                        text-white
                      "
                      target="_blank"
                      >
                        Pay Dues
                      </Link>
                  </div>
                </div>
              </div>
            </section>
    </>
  )
}