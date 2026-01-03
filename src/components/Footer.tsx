import imgInstagram from "../assets/instagram.png"
import imgLinkedIn from "../assets/linkedin.png"
import imgGmail from "../assets/gmail.png"

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-400 px-6 py-4 mt-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Data Club of Notre Dame
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/dataclubnd/"
            target="_blank"
          >
            <img
              src={imgInstagram}
              alt="Instagram"
              className="h-7 w-7"
            />
          </a>

          <a
            href="https://www.linkedin.com/company/notre-dame-data-club/"
            target="_blank"
          >
            <img
              src={imgLinkedIn}
              alt="LinkedIn"
              className="h-7 w-7"
            />
          </a>

          <a
            href="mailto:dataclub@nd.edu"
          >
            <img
              src={imgGmail}
              alt="Gmail"
              className="h-7 w-7"
            />
          </a>
        </div>

      </footer>
    )
  }  