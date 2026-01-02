import CTACard from "./CTACard"

export default function CTASection() {
  return (
    <section className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="
          flex flex-col gap-6
          md:flex-row md:items-center md:justify-between
        ">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Ready to get involved?
            </h2>
            <p className="text-gray-600 max-w-xl">
              Join the Notre Dame Data Club to work on real projects, learn practical
              data skills, and connect with other students passionate about data.
            </p>
          </div>

          <div className="
            flex flex-col gap-3
            sm:flex-row
          ">
            <CTACard
            to="/https://docs.google.com/forms/d/e/1FAIpQLSfSo9FI2kxPyMN4Xk5Imw2HReI23UrWqjbe8PcgXcWvRsPSLg/viewform"
            target="_blank"
            text="Join Mailing List"
            color="bg-[#C99700]"
            hover="hover:bg-[#B38600]"
            />

            <CTACard
            to="/events"
            target="_self"
            text="View Upcoming Events"
            color="bg-gray-900"
            hover="hover:bg-gray-800"
            />

            <CTACard
            to="/projects"
            target="_self"
            text="Explore Projects"
            border="border border-gray-300"
            hover="hover:bg-gray-100"
            textColor="text-gray-900"
            color=""
            />
          </div>
        </div>
      </div>
    </section>
  )
}