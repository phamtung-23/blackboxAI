'use client'

import { useEffect, useState } from 'react';
import { Agentation } from 'agentation';

export default function Home() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000')
      .then(res => res.text())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
<h1 className="text-4xl font-bold mb-8 animate-pulse">NextJS + NestJS with Docker & pnpm</h1>
        <p className="text-xl bg-white/20 p-6 rounded-lg">{data}</p>
        <p className="mt-4">Backend API: <a href="http://localhost:3000" className="underline">localhost:3000</a></p>
      </main>
      { <Agentation />}
    </>
  );
}
