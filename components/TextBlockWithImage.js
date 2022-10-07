import ImageWithHideOnError from "../hooks/ImageWithHideOnError";
import { urlFor } from "../lib/api";
import Button from "./Button";
import LogoIcon from "../public/icon_white.png";

const TextBlockWithImage = ({ children, color, title, image, layout, cta }) => {
  return (
    <div className={`TextBlockWithImage TextBlockWithImage--${layout}`}>
      <div
        className={`TextBlockWithImage__block TextBlockWithImage__block--${color}`}
      >
        <div
          className={`TextBlockWithImage__title TextBlockWithImage__title--${color}Theme heading-secondary`}
        >
          {title}
        </div>
        <div className="TextBlockWithImage__text">{children}</div>
        {cta ? <Button href={cta.btnLink.slug.current}>{cta.btnText}</Button> : ""}
      </div>
      <div className="TextBlockWithImage__imageContainer">
        <ImageWithHideOnError
          src={urlFor(image).url()}
          layout="responsive"
          width={720}
          height={720}
          alt=""
        />
      </div>
    </div>
  );
};

export default TextBlockWithImage;
