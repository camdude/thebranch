import moment from "moment";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer__">
        <div>
          <div>Heading</div>
          <ul>
            <li>
              <a className="link" href="#" target="blank">
                link 1
              </a>
            </li>
            <li>
              <a className="link" href="#" target="blank">
                link 2
              </a>
            </li>
            <li>
              <a className="link" href="#" target="blank">
                link 3
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="Footer__copyright">
        Copyright © 2022-{moment().format("YYYY")} The Branch Christian Church,
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
