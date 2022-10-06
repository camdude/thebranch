import ImageWithHideOnError from "../hooks/ImageWithHideOnError";
import { urlFor } from "../lib/api";

const ImageGrid = ({ data }) => {
  return (
    <div className="ImageGrid">
      {data.map((i) => {
        return (
          <div key={i._key} className="ImageGrid__item">
            <ImageWithHideOnError
              src={urlFor(i.image).url()}
              fill="responsive"
              width={720}
              height={720}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
