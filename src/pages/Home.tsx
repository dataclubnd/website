import ImageCarousel from "../components/ImageCarousel";
import img8451SP25 from "../assets/8451_GroupPhoto3.png";
import imgAunalyticsFL25 from "../assets/Aunalytics.jpeg";
import imgAIWorkshopFL25 from "../assets/AI_Workshop.jpg";
import imgProjectGalleryFL25 from "../assets/ProjectGallerySP25.png";
import DashboardCard from "../components/DashboardCard";
import WhatWeDoCard from "../components/WhatWeDoCard";
import CTASection from "../components/CTA";
import projectsData from "../content/projects.json"
import eventsData from "../content/events.json"

import { useEffect, useState } from "react";

const images = [
  img8451SP25,
  imgAunalyticsFL25,
  imgAIWorkshopFL25,
  imgProjectGalleryFL25,
];

type Project = {
  title: string;
  description: string;
  term: "Spring" | "Fall";
  year: string;
  image: string;
  link: string;
};

type Event = {
  title: string;
  description: string;
  time: string;
  location: string;
  link: string;
};

export default function Home() {
  const [project, setProject] = useState<Project | null>(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const [errorProject, setErrorProject] = useState<string | null>(null);

  const [event, setEvent] = useState<Event | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [errorEvent, setErrorEvent] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Transform projectsData to ensure term is "Spring" or "Fall"
        const transformedProjects = projectsData.map((project) => {
          const validTerm = project.term === "Spring" || project.term === "Fall" ? project.term : "Spring"; // Default to "Spring" if invalid
          return { ...project, term: validTerm as "Spring" | "Fall" };
        });
  
        // Sort projects by year (descending) and term (Spring before Fall)
        const sortedProjects = transformedProjects.sort((a, b) => {
          const yearDiff = parseInt(b.year) - parseInt(a.year); // Descending order by year
          if (yearDiff !== 0) return yearDiff;
  
          const termOrder = { Spring: 1, Fall: 2 };
          return termOrder[a.term] - termOrder[b.term]; // Spring before Fall
        });
  
        // Get the most recent project
        setProject(sortedProjects[0] || null);
      } catch (error: any) {
        setErrorProject(error.message);
      } finally {
        setLoadingProject(false);
      }
    };
  
    fetchProject();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Filter events to include only those with a time greater than or equal to now
        const now = new Date();
        const upcomingEvents = eventsData.filter((event) => new Date(event.time) >= now);

        // Sort events by time in ascending order
        const sortedEvents = upcomingEvents.sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        );

        // Get the next upcoming event
        setEvent(sortedEvents[0] || null);
      } catch (error: any) {
        setErrorEvent(error.message);
      } finally {
        setLoadingEvent(false);
      }
    };

    fetchEvent();
  }, []);

  const cardsCount =
    (event && !loadingEvent && !errorEvent ? 1 : 0) +
    (project && !loadingProject && !errorProject ? 1 : 0);

  return (
    <section>
      <div className="relative w-full">
        <ImageCarousel images={images} />
        <div className="absolute inset-0">
          <div className="max-w-6xl mx-auto h-full flex items-end px-0 pb-0 justify-center md:justify-start">
            <h2 className="text-white font-bold drop-shadow-lg text-[clamp(1rem,4vw,3rem)] px-5">
              Welcome to the Data Club of Notre Dame
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-3 md:py-6">
        <div
          className={`
            grid gap-3 md:gap-6
            ${cardsCount === 2 ? "md:grid-cols-2" : "grid-cols-1"}
          `}
        >
          {!loadingEvent && !errorEvent && event && (
            <DashboardCard
              heading="Upcoming Event"
              title={event.title}
              dateText={new Date(event.time).toLocaleString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
              linkTo="/events"
              linkLabel="View all events"
            />
          )}

          {!loadingProject && !errorProject && project && (
            <DashboardCard
              heading="Featured Project"
              title={project.title}
              dateText={`${project.term} ${project.year}`}
              linkTo="/projects"
              linkLabel="View all projects"
            />
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-1 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">What We Do</h2>

        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          <WhatWeDoCard
            title="Project-Based Learning"
            description="Members work in teams on semester-long data projects using real datasets, industry tools, and modern workflows."
          />

          <WhatWeDoCard
            title="Workshops & Events"
            description="We host hands-on workshops, technical talks, and speaker events to help members build practical data skills."
          />

          <WhatWeDoCard
            title="Community & Mentorship"
            description="Our club fosters collaboration, mentorship, and leadership opportunities for students interested in data."
          />
        </div>
      </div>

      <CTASection></CTASection>
    </section>
  );
}