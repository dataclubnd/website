import { useEffect, useState } from "react"

type Event = {
  title: string
  description: string
  time: string
  location: string
  link: string
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [dateFilter, setDateFilter] = useState<string>("")
  const [searchFilter, setSearchFilter] = useState<string>("")

  useEffect(() => {
    const fetchEvents = async () => {
      const now = new Date();
  
      try {
        const response = await fetch("/src/content/events.json");
        if (!response.ok) {
          throw new Error("Failed to fetch events.json");
        }
  
        const data: Event[] = await response.json();
  
        // Filter events to include only those with a valid time or "TBD"
        const filteredData = data.filter((event) => {
          if (event.time === "TBD") {
            return true; // Include events with "TBD"
          }
  
          const eventTime = new Date(event.time);
          return eventTime >= now; // Include events with a valid time greater than or equal to now
        });
  
        // Sort events by time in ascending order, placing "TBD" events at the end
        filteredData.sort((a, b) => {
          if (a.time === "TBD") return 1; // "TBD" goes to the end
          if (b.time === "TBD") return -1; // "TBD" goes to the end
          return new Date(a.time).getTime() - new Date(b.time).getTime();
        });
  
        setEvents(filteredData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      event.description.toLowerCase().includes(searchFilter.toLowerCase());
  
    const matchesDate =
      !dateFilter || event.time === "TBD" || 
      (event.time !== "TBD" && new Date(event.time) >= new Date(dateFilter));
  
    return matchesSearch && matchesDate;
  });

  const setDate = (time: string): string => {
    if (time == "TBD"){
      return "TBD";
    } else return new Date(time).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Events
          </h1>

          <p className="text-gray-600 text-base md:text-lg mx-auto">
            Throughout each semester, the Data Club hosts a variety of club-wide events
            designed to inform, engage, and support our members. These include project
            kickoff meetings where we introduce upcoming projects, as well as end-of-semester
            project galleries where each team presents their work, shares insights, and
            reflects on their learning experience.<br/><br/>
            
            In addition, we organize hands-on
            workshops and professional development opportunities focused on data-driven
            skills, such as AI and machine learning workshops, technical tutorials, and
            panel discussions with industry professionals. Our events are open, collaborative,
            and centered around helping members grow both technically and professionally.
          </p>

            {loading && <p>Loading events...</p>}

            {!loading && error && (
            <p className="text-red-500">{error}</p>
            )}
        </section>

        <section className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Upcoming Events
            </h2>

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
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                />
              </div>
            </div>

            { !loading && !error && filteredEvents.length == 0 && 
              <p className="text-xl">
                No Events
              </p>
            }

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-12">
            {filteredEvents.map((event, index) => (
                <div
                    key={index}
                    className="border rounded-lg p-4 shadow-sm"
                >

                <h3 className="text-xl font-semibold">
                {event.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                🗓️ {setDate(event.time)}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                📍 {event.location}
                </p>

                <p className="mt-2 text-gray-700 mb-3">
                {event.description}
                </p>

                {event.link && event.link.trim() !== "" && (
                  <a
                    href={event.link}
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
                
                </div>
            ))}
            </div>
        </section>
    </>
  )
}