
import Logo from "../assets/DataClubLogo.svg";
import { useEffect } from "react";

export default function Header() {

    useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://conductor.nd.edu/javascripts/themes/ndt/4.0/ndt.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
<header id="header" className="site-header bg--brand-blue">
  <a className="header-mark-mobile" href="https://www.dataclub.nd.edu/" title="Notre Dame Data Club">
    <img className="small-logo" aria-hidden="true" aria-label="Notre Dame Data Club" src={Logo}></img>
    <span className="visually-hidden">Notre Dame Data Club</span>
  </a>

  <div className="header-group grid-cols-none">
    <div className="header-title">
      <a href="/" accessKey="1" title="Homepage shortcut key = 1">
      <img className="logo" aria-hidden="true" alt="Notre Dame Data Club Logo" src={Logo}></img>
      </a>
      <div className="header-title-name justify-center">
        <a href="/"><h1 id="site-title" className="title">Notre Dame Data Club</h1></a>
      </div>
    </div>
    <div className="header-nav">
</div>
<nav id="nav-primary" className="nav-primary" aria-label="Primary">
  <div id="primary">
    <ul className="justify-center">
      <li><a href="/About">About</a></li>
      <li><a href="/Events">Events</a></li>
      <li><a href="/Projects">Projects</a></li>
      <li><a href="/Archive">Archives</a></li>
      <li><a href="mailto:dataclub@nd.edu">Contact</a></li>
    </ul>
  </div>
</nav>
</div>
</header>
  )
}