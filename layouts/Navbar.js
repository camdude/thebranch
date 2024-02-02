import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../public/logo_full_colour_RGB.png";
import Icon from "../components/Icon";

export default function Navbar({ paths = { sections: [] } }) {
  const [navOpen, setnavOpen] = useState(false);
  return (
    <nav className="Navbar">
      <div className="Navbar__header">
        <div className="Navbar__menu">
          <div
            className="Navbar__icon"
            onClick={() => {
              setnavOpen(!navOpen);
            }}
          >
            <Icon
              icon={faBars}
              size="lg"
              onClick={() => {
                setnavOpen(!navOpen);
              }}
            />
          </div>
        </div>
        <Link href="/">
          <a className="Navbar__logo">
            <Image
              src={Logo}
              width={2400 / 20}
              height={1055 / 20}
              alt="The Branch"
            />
          </a>
        </Link>
      </div>
      <ul className={`Navbar__list ${navOpen ? "Navbar__list--open" : ""}`}>
        {paths.sections.map((s) => {
          return (
            <li className="Navbar__item" key={s._key}>
              <Link href={`/${s.target.slug.current}`}>
                <a className="Navbar__link">{s.title || s.target.title}</a>
              </Link>
              {s.links ? (
                <ul className="Navbar__subList">
                  {s.links.map((l) => {
                    return (
                      <li className="Navbar__subItem" key={l._key}>
                        <Link href={`/${l.target.slug.current}`}>
                          <a className="Navbar__subLink">{l.target.title}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
        <li className="Navbar__item">
          <Link href="/sermons">
            <a className="Navbar__link">Sermons</a>
          </Link>
        </li>
        <li className="Navbar__item">
          <Link href="/calendar">
            <a className="Navbar__link">Calendar</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
