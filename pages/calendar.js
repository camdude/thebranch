import { getFooter, getNavigation } from "../lib/api";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Head from "../components/Head";
import Section from "../layouts/Section";

export default function Calendar({ navPaths, footerLinks }) {
  return (
    <div>
      <Head title={`The Branch | Calendar`} />
      <Navbar paths={navPaths} />
      <main>
        <Section color="primary">
          <h1 className="heading-primary">Calendar</h1>
          <p className="paragraph">
            See what&apos;s happening in the life of our church.
          </p>
          <iframe
            src="https://thebranchcc.churchcenter.com/calendar?embed=true&view=list"
            style={({ width: "100%" }, { height: "500px" })}
            className="planning-center-calender-embed"
            frameBorder="0"
          ></iframe>
        </Section>
      </main>
      <Footer links={footerLinks} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const navPaths = await getNavigation();
  const footerLinks = await getFooter();

  return {
    props: { navPaths, footerLinks },
    revalidate: 1,
  };
}
