import Head from "next/head";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import { getHomepage, getNavigation } from "../lib/api";

export default function Home({ navPaths, page }) {
  return (
    <div>
      <Head>
        <title>The Branch Christian Church</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar paths={navPaths}/>
      <main className="main-body">
        <h1 className="heading-primary">Heading 1</h1>
        <h2 className="heading-secondary">Heading 2</h2>
        <br />
        <h3 className="heading-tertiary">Heading 3</h3>
        <p className="paragraph">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione eum
          sunt laudantium consequatur ad iusto. Consequatur laborum laboriosam
          inventore voluptate quas magni maiores, autem facere velit, error
          similique sequi ipsa.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const navPaths = await getNavigation();
  const page = await getHomepage();

  return {
    props: { navPaths, page: page[0].homepage },
    revalidate: 1,
  };
}
