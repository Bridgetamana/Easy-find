// pages/_error.js
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Error({ statusCode }) {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{statusCode
        ? `An error ${statusCode} occurred on the server`
        : 'An error occurred on the client'}</h1>
      <p>
        {statusCode === 404
          ? `The page ${router.asPath} could not be found.`
          : 'Sorry, we encountered an error. Please try again.'
        }
      </p>
      <Link href="/">
        <p>Go back home</p>
      </Link>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
