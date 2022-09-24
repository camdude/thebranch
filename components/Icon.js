import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ icon }) => {
  return (
    <div className="Icon">
      <FontAwesomeIcon size="2xs" icon={icon} />
    </div>
  );
};

export default Icon;
