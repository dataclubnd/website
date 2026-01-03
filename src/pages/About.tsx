import WhatWeDoCard from "../components/WhatWeDoCard"
import { Link } from 'react-router-dom'

export default function About() {
    return (
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            About the Data Club
          </h1>
          
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            <WhatWeDoCard
              title="Mission"
              description="To empower students with hands-on, real-world data experience through collaborative, project-based learning."
              />
          
            <WhatWeDoCard
              title="Vision"
              description="To build a community of data-driven thinkers who use technology and analytics to create meaningful impact."
              />
          
            <WhatWeDoCard
              title="Values"
              description="We value curiosity, teamwork, ethical data use, continuous learning, and making a positive difference."
              />
          </div>
        </div>

        <section className="my-16 text-center max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl font-medium text-gray-700 italic">
            “Turning data into insight, and students into leaders.”
          </p>
        </section>

        <div className="pb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Our Purpose
          </h2>

          <p className="text-gray-600 text-base md:text-lg mx-auto">
            Data is everywhere in modern society. From technology and 
            healthcare to finance, logistics, and public policy, data 
            drives decisions that shape the world around us.<br/><br/>

            The Data Club exists to give students a meaningful advantage
            in this data-driven world. We actively involve members in
            semester-long projects that mirror real industry work. By cleaning
            data, building analyses, designing systems, and collaborating 
            in teams they learn to provide solutions to open-ended problems.<br/><br/>

            Through these experiences, students don't just learn technical 
            skills; they learn how to communicate ideas, plan effectively, 
            and work together to deliver results in real-world environments. 
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Club Evolution & Culture
          </h2>

          <p className="text-gray-600 text-base md:text-lg mx-auto">
            As the Data Club has grown, we've evolved into a more structured and intentional organization. 
            We've expanded our presence through social media, launched a dedicated website, and increased 
            the number of general meetings and workshops we host.<br/><br/>

            Our goal is to foster a culture of collaboration, curiosity, and responsible data use where 
            students support each other and work together to make a positive impact beyond the classroom.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center
                      rounded-lg bg-[#C99700] text-white
                      px-8 py-3 text-base font-medium
                      hover:bg-[#B38600] transition"
          >
            Explore Our Projects
          </Link>
        </div>

      </section>
    )
  }  