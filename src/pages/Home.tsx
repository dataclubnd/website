import ImageCarousel from "../components/ImageCarousel"
import img8451SP25 from "../assets/8451_GroupPhoto3.png"
import imgAunalyticsFL25 from "../assets/Aunalytics.jpeg"
import imgAIWorkshopFL25 from "../assets/AI_Workshop.jpg"
import imgProjectGalleryFL25 from "../assets/ProjectGallerySP25.png"
import DashboardCard from "../components/DashboardCard"
import WhatWeDoCard from "../components/WhatWeDoCard"
import CTASection from "../components/CTA"

import { useEffect, useState } from "react"
import { supabase } from '../services/supabaseClient'

const images = [
  img8451SP25,
  imgAunalyticsFL25,
  imgAIWorkshopFL25,
  imgProjectGalleryFL25,
]

type Project = {
  company: string
  description: string
  term: string
  year: number
  image: string
}

type Event = {
  title: string
  description: string
  time: string
  location: string
}

export default function Home() {
  const [project, setProject] = useState<Project>()
  const [loadingProject, setLoadingProject] = useState(true)
  const [errorProject, setErrorProject] = useState<string | null>(null)
  
  const [event, setEvent] = useState<Event>()
  const [loadingEvent, setLoadingEvent] = useState(true)
  const [errorEvent, setErrorEvent] = useState<string | null>(null)

  useEffect(() => {
      const fetchProject = async () => {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('year', {ascending: false})
          .order('term', {ascending: true})
          .limit(1)
          .maybeSingle()
  
        if (error) {
          setErrorProject(error.message)
        } else {
          setProject(data)
        }
        setLoadingProject(false)
      }
  
      fetchProject()
    }, [])

    useEffect(() => {
      const fetchEvent = async () => {
        const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('time', { ascending: false })
        .limit(1)
        .maybeSingle()
  
        if (error) {
          setErrorEvent(error.message)
        } else {
          setEvent(data)
        }
        setLoadingEvent(false)
      }
  
      fetchEvent()
    }, [])

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">

              { !loadingEvent && !errorEvent && event &&
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
              }
              

              { !loadingProject && !errorProject && project && 
              <DashboardCard
              heading="Featured Project"
              title={project.company}
              dateText={project.term + " " + project.year}
              linkTo="/projects"
              linkLabel="View all projects"
              />
            }

          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-1 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            What We Do
          </h2>

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
    )
  }  