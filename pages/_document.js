import Document, { Html, Head, Main, NextScript } from 'next/document';


export const metadata = {
  title: "EasyFind",
  description: "Hire the best talent or get hired for your dream job",
  keywords: "hire, talents, jobs, remote, nigeria, africa, tech, software, developer, engineer, designer, product, manager, marketing, sales, business, analyst, data, scientist, machine, learning, artificial, intelligence, easyfind, easy, find",
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <title>{metadata.title}</title> */}
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={metadata.keywords} />
          <link rel="icon" href="/favicon.svg" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
