
import Logo from "../assets/logo.svg"

export default function Header() {
  return (

<header id="header" className="site-header left bg--gray-light">
  <a className="header-mark-mobile " href="https://www.nd.edu/" title="University of Notre Dame">
    <img src={Logo} alt="University of Notre Dame" className="small-logo p-4" />
    <span className="visually-hidden">University of Notre Dame</span>
  </a>
  <div className="header-group">
    <div className="header-title p-3 center">
      <img src={Logo} alt="University of Notre Dame" className="small-logo" />
      <div className="header-title-name">
        <h1 id="site-title" className="site-title"><a href="/" title="Homepage shortcut key = 1">Data Club</a></h1>
      </div>
    </div>
    <div className="header-nav">
      </div>
<nav id="nav-primary" className="nav-primary center" aria-label="Primary">
  <div id="primary">
    <ul>
      <li><a href="/about">About</a></li>
      <li><a href="/events">Events</a></li>
      <li><a href="/projects">Projects</a></li>
      <li><a href="/archive">Archives</a></li>
      <li><a href="mailto:dataclub@nd.edu">Contact</a></li>
    </ul>
  </div>
</nav>
</div>
</header>
  )
}