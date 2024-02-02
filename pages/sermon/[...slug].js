import {
  getFooter,
  getNavigation,
  getSermonByTitle,
  getSermonList,
} from "../../lib/api";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import Head from "../../components/Head";
import Section from "../../layouts/Section";

export default function Page({ navPaths, sermon, footerLinks }) {
  const router = useRouter();
  console.log(sermon);

  if (!router.isFallback && !sermon?.length) {
    return (
      <div>
        <Head title={`The Branch | 404 - Sermon Not Found`} />
        <Navbar paths={navPaths} />
        <main className="main-body">
          <h1 className="heading-primary u-center-text">
            404 - Sermon Not Found
          </h1>
          <p className="paragraph">
            The page you are looking for might have been removed or temporarily
            unavailable.
          </p>
          <Button href="/sermons">Go back to sermon list</Button>
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
      <Head title={`The Branch | ${sermon[0].title}`} />
      <Navbar paths={navPaths} />
      <main>
        <Section color="primary">
          <h1>{sermon[0].title}</h1>
          <p>{sermon[0].preacher.firstname +" " + sermon[0].preacher.surname}</p>
          <p>{sermon[0].passage}</p>
          <br />
          <audio src={sermon[0].audio.asset.url} controls/>
        </Section>
      </main>
      <Footer links={footerLinks} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const navPaths = await getNavigation();
  const sermon = await getSermonByTitle(params.slug[params.slug.length - 1].replace(/-/g, ' '));
  const footerLinks = await getFooter();

  return {
    props: { navPaths, sermon, footerLinks },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const sermons = await getSermonList();

  var sermonPaths = [];
  sermons.map((s) => {
    sermonPaths.push({
      params: { slug: [s.title.replace(/-/g, ' ')] },
    })
  })

  return {
    paths: sermonPaths,
    fallback: true,
  };
}
