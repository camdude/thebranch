import BlockContent from "@sanity/block-content-to-react";
import { getNavigation, getPagebySlug, urlFor } from "../lib/api";
import { useRouter } from "next/router";
import ImageWithHideOnError from "../hooks/ImageWithHideOnError";
import Section from "../layouts/Section";
import Button from "../components/Button";
import Head from "next/head";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

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
    button: (props) => {
      return <Button href={props.node.url}>{props.node.title}</Button>;
    },
  },
};

export default function Page({ navPaths, page }) {
  const router = useRouter();
  console.log(page, !page?.length);

  if (!router.isFallback && !page?.length) {
    return (
      <main className="main-body">
        <h1 className="heading-primary u-center-text">ERROR 404</h1>
      </main>
    );
  }

  if (router.isFallback) {
    return <main className="main-body"></main>;
  }
  return (
    <div>
      <Head>
        <title>The Branch Christian Church</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            case "textBlock":
              return (
                <Section color={s.colour} key={s._key}>
                  <BlockContent blocks={s.content} serializers={serializers} />
                </Section>
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
      <Footer />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const navPaths = await getNavigation();
  const page = await getPagebySlug(params.slug[params.slug.length - 1]);

  return {
    props: { navPaths, page },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const nav = await getNavigation();
  console.log(nav);
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
