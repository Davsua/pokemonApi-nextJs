import Head from 'next/head';
import { NavBar } from '../ui';
import { useRouter } from 'next/router';

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const origin = typeof window === 'undefined' ? '' : window.location.origin;

const Layouts: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ? title : 'Pokemon App'}</title>
        <meta name="author" content="David Suarez" />
        <meta name="description" content={`Informacion sobre el pokemon ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`informacion sobre ${title}`} />
        <meta
          property="og:description"
          content={`esta es la informacion basica sobre el pokemon ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <NavBar />

      <main
        style={{
          padding: '0px 20px'
        }}
      >
        {children}
      </main>
    </>
  );
};

export default Layouts;
