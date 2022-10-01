import ImageWithHideOnError from "../hooks/ImageWithHideOnError";
import { urlFor } from "../lib/api";
import Button from "./Button";

const TextBlockWithImage = ({ children, color, title, image, cta }) => {
  return (
    <div className={`TextBlockWithImage TextBlockWithImage--${color}`}>
      <div className="TextBlockWithImage__block">
        <div
          className={`TextBlockWithImage__title TextBlockWithImage__title--${color}Theme heading-secondary`}
        >
          {title}
        </div>
        <div className="TextBlockWithImage__text">{children}</div>
        {cta ? <Button href={cta.btnLink._ref}>{cta.btnText}</Button> : ""}
      </div>
      <div className="TextBlockWithImage__image">
        <ImageWithHideOnError
          src={urlFor(image).url()}
          layout="responsive"
          height={720}
          width={720}
          alt=""
        />
      </div>
      
    </div>
  );
};

export default TextBlockWithImage;
