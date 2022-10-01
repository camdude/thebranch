import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ icon, size }) => {
  return (
    <div className="Icon">
      <FontAwesomeIcon size={size} icon={icon} />
    </div>
  );
};

export default Icon;
