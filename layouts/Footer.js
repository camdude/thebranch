import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import moment from "moment";

const Footer = ({ links }) => {
  return (
    <footer className="Footer">
      <div className="Footer__columns">
        <div className="Footer__row">
          <h3 className="heading-tertiary">Social</h3>
          <ul className="Footer__list">
            <li className="Footer__item">
              <div>
                <a className="link" href={links.socials.fb} target="blank">
                  {/* <FontAwesomeIcon className="icon" size="2xs" icon={faFacebookSquare}/> */}
                  Facebook
                </a>
              </div>
            </li>
            <li className="Footer__item">
              <a className="link" href={links.socials.ig} target="blank">
                Instagram
              </a>
            </li>
            <li className="Footer__item">
              <a className="link" href={links.socials.yt} target="blank">
                Youtube
              </a>
            </li>
          </ul>
        </div>
        <div className="Footer__row">
          <h3 className="heading-tertiary">Contact</h3>
          <ul className="Footer__list">
            <li className="Footer__item">
              <p className="Footer__text paragraph">{links.details.address}</p>
            </li>
            <li className="Footer__item">
              <a
                className="link"
                href={`mailto:${links.details.email}`}
                target="blank"
              >
                {links.details.email}
              </a>
            </li>
            <li className="Footer__item">
              <a
                className="link"
                href={`tel:${links.details.phone.replace(/\s+/g, "")}`}
                target="blank"
              >
                {links.details.phone}
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
                  <a className="link" href={l.link} target="blank">
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
