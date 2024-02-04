import BlockContent from "@sanity/block-content-to-react";
import { getFooter, getNavigation, getPagebySlug, urlFor } from "../lib/api";
import { useRouter } from "next/router";
import ImageWithHideOnError from "../hooks/ImageWithHideOnError";
import useExternalScripts from "../hooks/useExternalScripts";
import Section from "../layouts/Section";
import HeadingBlock from "../components/HeadingBlock";
import BannerImage from "../components/BannerImage";
import Button from "../components/Button";
import YouTube from "../components/YouTube";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import TextBlockWithImage from "../components/TextBlockWithImage";
import Head from "../components/Head";
import Calendar from "../components/Calendar";

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
      const { slug = {} } = mark.reference;
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
    form: (props) => {
      return (
        <Button href={`${props.node.url}?open-in-church-center-modal=true`}>
          {props.node.label}
        </Button>
      );
    },
  },
};

export default function Page({ navPaths, page, footerLinks }) {
  const router = useRouter();
  useExternalScripts("https://js.churchcenter.com/modal/v1");

  if (!router.isFallback && !page?.length) {
    return (
      <div>
        <Head title={`The Branch | 404 - Page Not Found`} />
        <Navbar paths={navPaths} />
        <main className="main-body">
          <h1 className="heading-primary u-center-text">
            404 - Page Not Found
          </h1>
          <p className="paragraph">
            The page you are looking for might have been removed or temporarily
            unavailable.
          </p>
          <Button href="/">Go back to home</Button>
        </main>
        <Footer links={footerLinks} />
      </div>
    );
  }

  if (router.isFallback) {
    return <main className="main-body"></main>;
  }
  return (
    <div>
      <Head title={`The Branch | ${page[0].title}`} />
      <Navbar paths={navPaths} />
      <main>
        {page[0].coverImage ? (
          <div className="Page__banner">
            <ImageWithHideOnError
              src={urlFor(page[0]?.coverImage).url()}
              height={1080}
              width={1920}
              alt={`${page[0].title} Banner`}
            />
          </div>
        ) : null}
        {page[0].pageBuilder.map((s) => {
          switch (s._type) {
            case "headingBlock":
              return (
                <HeadingBlock key={s._key} color={s.colour}>
                  {s.heading}
                </HeadingBlock>
              );
            case "banner":
              return <BannerImage key={s._key} image={s.image} />;
            case "textBlock":
              return (
                <Section color={s.colour} key={s._key}>
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
              return (
                <Section key={s._key}>
                  <Button href={`${s.url}?open-in-church-center-modal=true`}>
                    {s.label}
                  </Button>
                </Section>
              );
            case "hero":
              return <div key={s._key}></div>;
            case "calendar":
              return (
                <Calendar
                  key={s._key}
                  url={s.url}
                  view={s.style}
                  category={s.category}
                />
              );
          }
        })}
      </main>
      <Footer links={footerLinks} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const navPaths = await getNavigation();
  const page = await getPagebySlug(params.slug[params.slug.length - 1]);
  const footerLinks = await getFooter();

  return {
    props: { navPaths, page, footerLinks },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const nav = await getNavigation();
  var navPaths = [];
  nav.sections.map((s) => {
    if (s.links) {
      s.links.map((l) => {
        navPaths.push({
          params: { slug: [s.target.slug.current, l.target.slug.current] },
        });
      });
    }
    navPaths.push({
      params: { slug: [s.target.slug.current] },
    });
  });

  return {
    paths: navPaths,
    fallback: true,
  };
}
