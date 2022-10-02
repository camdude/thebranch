import ImageWithHideOnError from "../hooks/ImageWithHideOnError";
import { urlFor } from "../lib/api";

const BannerImage = ({ image }) => {
  return (
    <div className="BannerImage">
      <ImageWithHideOnError src={urlFor(image).url()} layout="responsive" width="1280" height="400"/>
    </div>
  );
};

export default BannerImage;
