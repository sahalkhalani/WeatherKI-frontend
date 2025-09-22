import Head from 'next/head';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <>
      <Head>
        <title>WeatherKI - Smart Weather Widgets</title>
        <meta name="description" content="Create and manage weather widgets for cities around the world. Get real-time weather updates with a beautiful, responsive interface." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><defs><linearGradient id='bg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%230ea5e9'/><stop offset='100%' stop-color='%233b82f6'/></linearGradient></defs><rect x='0' y='0' width='24' height='24' rx='4' ry='4' fill='url(%23bg)'/><g fill='none' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M18 16H8a5 5 0 1 1 4.64-6.95A3.5 3.5 0 0 1 18 16z'/></g></svg>"></link>
      </Head> 
      <Dashboard />
    </>
  );
}