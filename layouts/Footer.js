import {
  faFacebookSquare,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faMapLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Icon from "../components/Icon";

const Footer = ({ links }) => {
  return (
    <footer className="Footer">
      <div className="Footer__columns">
        <div className="Footer__row">
          <h3 className="heading-tertiary">Social</h3>
          <ul className="Footer__list">
            <li className="Footer__item">
              <div>
                <div className="Footer__icon">
                  <Icon icon={faFacebookSquare} />
                </div>
                <a
                  className="Footer__text link"
                  href={links.socials.fb}
                  target="blank"
                >
                  Facebook
                </a>
              </div>
            </li>
            <li className="Footer__item">
              <div className="Footer__icon">
                <Icon icon={faInstagram} />
              </div>
              <a
                className="Footer__text link"
                href={links.socials.ig}
                target="blank"
              >
                Instagram
              </a>
            </li>
            <li className="Footer__item">
              <div className="Footer__icon">
                <Icon icon={faYoutube} />
              </div>
              <a
                className="Footer__text link"
                href={links.socials.yt}
                target="blank"
              >
                Youtube
              </a>
            </li>
          </ul>
        </div>
        <div className="Footer__row">
          <h3 className="heading-tertiary">Contact</h3>
          <ul className="Footer__list">
            <li className="Footer__item">
              <div className="Footer__icon">
                <Icon icon={faEnvelope} />
              </div>
              <a
                className="Footer__text link"
                href={`mailto:${links.details.email}`}
                target="blank"
              >
                {links.details.email}
              </a>
            </li>
            <li className="Footer__item">
              <div className="Footer__icon">
                <Icon icon={faPhone} />
              </div>
              <a
                className="Footer__text link"
                href={`tel:${links.details.phone.replace(/\s+/g, "")}`}
                target="blank"
              >
                {links.details.phone}
              </a>
            </li>
            <li className="Footer__item">
              <div className="Footer__icon">
                <Icon icon={faMapLocationDot} />
              </div>
              <a
                className="Footer__text link"
                href={`https://www.google.com/maps/search/?api=1&query=${links.details.address}`}
                target="blank"
              >
                {links.details.address}
              </a>
            </li>
          </ul>
        </div>
        <div className="Footer__row">
          <h3 className="heading-tertiary">Members</h3>
          <ul className="Footer__list">
            {links.member.map((l) => {
              return (
                <li className="Footer__item" key={l._key}>
                  <div className="Footer__icon">
                    <Icon icon={faLink} />
                  </div>
                  <a className="Footer__text link" href={l.link} target="blank">
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="Footer__copyright">
        © {moment().format("YYYY")} The Branch Christian Church. All Rights
        Reserved | Designed by{" "}
        <a className="link" href="http://cameronclifford.com/">
          Cameron Clifford
        </a>
      </div>
    </footer>
  );
};

export default Footer;
