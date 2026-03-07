import { Link } from "react-router-dom"

export default function CTASection() {
  return (
    <section className="bg--gray-extra-extra-light border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="
          flex flex-col gap-3
          lg:flex-row lg:items-center lg:justify-between
        ">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              Ready to get involved?
            </h2>
            <p className=" max-w-xl text-2xl lg:text-sm">
              Join the Notre Dame Data Club to work on real projects, learn practical
              data skills, and connect with other students passionate about data.
            </p>
          </div>

          <div className="
            flex flex-col gap-3 ml-3
            sm:flex-row
          ">
            
    <Link
      to="https://docs.google.com/forms/d/e/1FAIpQLSfSo9FI2kxPyMN4Xk5Imw2HReI23UrWqjbe8PcgXcWvRsPSLg/viewform"
      className={`
          btn btn--cta
          items-center justify-center
          transition whitespace-nowrap
      `}
      target="_blank"
    >
      Join Mailing List
    </Link>
            
                        
    <Link
      to="/events"
      className={`
          btn btn--more
          items-center justify-center
          transition whitespace-nowrap
      `}
      target="_self"
    >
      See Upcoming Events
    </Link>
    
 <Link
      to="/projects"
      className={`
          btn btn--more 
          items-center justify-center
          transition whitespace-nowrap
      `}
            target="_self"
    >
      Explore Projects
    </Link>
          </div>
        </div>
      </div>
    </section>
  )
}