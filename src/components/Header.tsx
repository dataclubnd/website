
import Logo from "../assets/DataClubLogo.svg"

export default function Header() {
  return (
    <header id="header" className="site-header bg--brand-blue text-white flex center">
      <div className="max-w-100">

        {/* Logo + Site Title */}
        <div className="header-title items-center gap-3 sm:gap-4">
          <a href="/" aria-label="Notre Dame Data Club – home">
            <img
              src={Logo}
              alt=""
              aria-hidden="true"
              className="logo"
            />
          </a>
          <div className="header-title-name border-l border-white/20 pl-3 sm:pl-4">
            <h1 id="site-title" className="site-title">
              <a href="/" title="Homepage">Notre Dame Data Club</a>
            </h1>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav
          id="nav-primary"
          className="nav-primary"
          aria-label="Primary"
        >
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/archive">Archives</a></li>
            <li><a href="mailto:dataclub@nd.edu">Contact</a></li>
          </ul>
        </nav>

      </div>
    </header>
  )
}
