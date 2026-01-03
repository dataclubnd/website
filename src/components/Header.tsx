import { NavLink } from "react-router-dom"
import Logo from "../assets/DataClubLogoNoBG.png"

export default function Header() {
  return (
    <header className="bg-gray-900 text-white fixed top-0 left-0 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <NavLink
            to="/"
            className="flex items-center justify-center md:justify-start gap-3"
          >
            <img
              src={Logo}
              alt="Data Club of Notre Dame Logo"
              className="h-10 w-auto"
            />
            <h1 className="text-lg md:text-xl font-bold whitespace-nowrap">
              Data Club of Notre Dame
            </h1>
          </NavLink>

          <nav className="flex justify-center md:justify-end gap-4 md:gap-6 text-sm md:text-base border-t border-gray-700 pt-3 md:pt-0 md:border-none">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/projects", label: "Projects" },
              { to: "/events", label: "Events" },
              { to: "/archive", label: "Archive" },
            ].map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-blue-300"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}