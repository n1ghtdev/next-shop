import React from 'react';
import Head from 'next/head';

export default function Home() {
  React.useEffect(() => {
    const apiCall = async () => {
      const res = await fetch('http://localhost:8080/');
      console.log(await res.text());
    };
    apiCall();
  }, []);

  return <div className="container"></div>;
}
