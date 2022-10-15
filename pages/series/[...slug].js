import {
  getFooter,
  getNavigation,
  getSeriesByTitle,
  getSermonsBySeries,
} from "../../lib/api";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import Head from "../../components/Head";
import Section from "../../layouts/Section";
import Table from "../../components/Table";

export default function Page({ navPaths, series, sermonList, footerLinks }) {
  const router = useRouter();
  console.log(series, sermonList);

  const tableData = [];
  sermonList.forEach((s) => {
    const sermonLink = `/sermon/${s.title.replace(/ /g, "-")}`;
    const preacher = `${s.preacher.firstname} ${s.preacher.surname}`;
    const date = new Date(s.date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"});

    tableData.push([
      [s.title, sermonLink],
      s.passage,
      preacher,
      date,
    ]);
  });


  if (!router.isFallback && !series?.length) {
    return (
      <div>
        <Head title={`The Branch | 404 - Series Not Found`} />
        <Navbar paths={navPaths} />
        <main className="main-body">
          <h1 className="heading-primary u-center-text">
            404 - Series Not Found
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
      <Head title={`The Branch | ${series[0].title}`} />
      <Navbar paths={navPaths} />
      <main>
        <Section color="primary">
          <h1>{series[0].title}</h1>
          <p>{series[0].description}</p>
        </Section>
        <Section color="grey">
          <Table
            headings={[
              "Sermon Title",
              "Bible Passage",
              "Preacher",
              "Date Preached",
            ]}
            data={tableData}
          />
        </Section>
      </main>
      <Footer links={footerLinks} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug[params.slug.length - 1].replace(/-/g, " ");

  const navPaths = await getNavigation();
  const series = await getSeriesByTitle(slug);
  const sermonList = await getSermonsBySeries(slug);
  console.log(sermonList)
  const footerLinks = await getFooter();

  return {
    props: { navPaths, series, sermonList, footerLinks },
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
