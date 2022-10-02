import BlockContent from "@sanity/block-content-to-react";
import Head from "next/head";
import BannerImage from "../components/BannerImage";
import Button from "../components/Button";
import TextBlockWithImage from "../components/TextBlockWithImage";
import YouTube from "../components/YouTube";
import ImageWithHideOnError from "../hooks/ImageWithHideOnError";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Section from "../layouts/Section";
import { getFooter, getHomepage, getNavigation, urlFor } from "../lib/api";

const overrides = {
  h1: (props) => <h1 className="block__h1" {...props} />,
  h2: (props) => <h2 className="block__h2" {...props} />,
  h3: (props) => <h3 className="block__h3" {...props} />,
  h4: (props) => <h3 className="block__h4" {...props} />,
  h5: (props) => <h3 className="block__h5" {...props} />,
  h6: (props) => <h3 className="block__h6" {...props} />,
  a: (props) => <a className="block__a" {...props} />,
  blockquote: (props) => <blockquote className="block__quote" {...props} />,
  normal: (props) =>
    props.children[0] === "" ? (
      <div className="block__break" />
    ) : (
      <p className="block__paragraph" {...props} />
    ),
};

const serializers = {
  list: (props) => {
    const { type } = props;
    const bullet = type === "bullet";
    if (bullet) {
      return <ul className="block__list" {...props} />;
    }
    return <ol className="block__list" {...props} />;
  },
  listItem: (props) => <li className="block__listItem" {...props} />,
  marks: {
    internalLink: ({ mark, children }) => {
      console.log(mark);
      const { slug = {} } = mark;
      const href = `/${slug.current}`;
      return (
        <a className="block__a" href={href}>
          {children}
        </a>
      );
    },
    link: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a className="block__a" href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      ) : (
        <a className="block__a" href={href}>
          {children}
        </a>
      );
    },
  },
  types: {
    block: (props) => {
      // Check if we have an override for the “style”
      return overrides[props.node.style]
        ? // if so, call the function and pass in the children, ignoring
          // the other unnecessary props
          overrides[props.node.style]({ children: props.children })
        : // otherwise, fallback to the provided default with all props
          BlockContent.defaultSerializers.types.block(props);
    },
    image: ({ node: { asset, alt, position = "center", crop, hotspot } }) => {
      return (
        <img
          src={urlFor({ asset, crop, hotspot }).width(300).fit("max").url()}
          alt={alt}
          style={{ float: position }}
        />
      );
    },
    button: (props) => {
      return <Button href={props.node.url}>{props.node.title}</Button>;
    },
    youtube: ({ node: { url } }) => {
      return <YouTube url={url} />;
    },
  },
};

export default function Home({ navPaths, page, footerLinks }) {
  return (
    <div>
      <Head>
        <title>The Branch Christian Church</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar paths={navPaths} />
      <main>
        {page.coverImage ? (
          <div className="Page__banner">
            <ImageWithHideOnError
              src={urlFor(page?.coverImage).url()}
              height={1080}
              width={1920}
              alt={`${page.title} Banner`}
            />
          </div>
        ) : null}
        {console.log(page.pageBuilder)}
        {page.pageBuilder.map((s) => {
          switch (s._type) {
            case "banner":
              return <BannerImage key={s._key} image={s.image} />;
            case "textBlock":
              return (
                <Section key={s._key} color={s.colour}>
                  <BlockContent blocks={s.content} serializers={serializers} />
                </Section>
              );
            case "textBlockWithImage":
              return (
                <TextBlockWithImage
                  key={s._key}
                  color={s.colour}
                  title={s.title}
                  image={s.image}
                  cta={s.cta}
                >
                  {s.content}
                </TextBlockWithImage>
              );
            case "gallery":
              return <div key={s._key}></div>;
            case "form":
              return <div key={s._key}></div>;
            case "hero":
              return <div key={s._key}></div>;
          }
        })}
      </main>
      <Footer links={footerLinks} />
    </div>
  );
}

export async function getStaticProps() {
  const navPaths = await getNavigation();
  const page = await getHomepage();
  const footerLinks = await getFooter();

  return {
    props: { navPaths, page: page[0].homepage, footerLinks },
    revalidate: 1,
  };
}
