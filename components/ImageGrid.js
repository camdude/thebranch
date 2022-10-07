import Link from "next/link";
import ImageWithHideOnError from "../hooks/ImageWithHideOnError";
import { urlFor } from "../lib/api";

const ImageGrid = ({ data }) => {
  return (
    <div className="ImageGrid">
      {data.map((i) => {
        if (i.link?.slug.current) {
          return (
            <Link key={i._key} href={i.link.slug.current}>
              <div className="ImageGrid__item ImageGrid__item--link">
                <ImageWithHideOnError
                  src={urlFor(i.image).url()}
                  fill="responsive"
                  width={720}
                  height={720}
                />
              </div>
            </Link>
          );
        } else {
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
        }
      })}
    </div>
  );
};

export default ImageGrid;
