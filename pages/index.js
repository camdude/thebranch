import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>The Branch Christian Church</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <footer></footer>
    </div>
  );
}
