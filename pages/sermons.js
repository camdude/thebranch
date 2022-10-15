import { getFooter, getNavigation, getSermonList } from "../lib/api";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Head from "../components/Head";
import Section from "../layouts/Section";
import Table from "../components/Table";
import Link from "next/link";

export default function Sermons({ navPaths, sermons, footerLinks }) {
  const tableData = [];
  sermons.forEach((s) => {
    const preacher = `${s.preacher.firstname} ${s.preacher.surname}`;
    tableData.push([
      [s.title, `/sermon/${s.date}`],
      s.series?.title || "Not in a series",
      s.passage,
      preacher,
      s.date,
    ]);
  });

  return (
    <div>
      <Head title={`The Branch | Sermons`} />
      <Navbar paths={navPaths} />
      <main>
        <Section color="primary">
          <h1 className="heading-primary">Sermons</h1>
          <p className="paragraph">
            Every Sunday the sermon for the service gets recorded. You can
            listen to all of them here.
          </p>
          <p className="paragraph">
            You can also subscribe to our podcast using either iTunes or another
            podcast application using{" "}
            <Link href="/api/feed/rss" passHref>
              <a target="_blank" rel="noopener noreferrer">
                this link
              </a>
            </Link>
            .
          </p>
        </Section>
        <Section color="grey">
          <Table
            headings={[
              "Sermon Title",
              "Sermon Series",
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
  const navPaths = await getNavigation();
  const sermons = await getSermonList();
  const footerLinks = await getFooter();

  return {
    props: { navPaths, sermons, footerLinks },
    revalidate: 1,
  };
}
