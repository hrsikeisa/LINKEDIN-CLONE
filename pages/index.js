import Head from 'next/head'
import {  getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Home() {

  const router = useRouter();
  //check if authenticated on client side
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });

  return (
    // h-screen is 100vh overflow is to make feed center scrollable
    <div className='bg-[#F3F2Ef] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6'>
      <Head>
        <title>Feed | Linkedin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      {/* gap for 2d space for 1d and there is div inside main to facilate special layout with responsiveness*/}
      <main className='flex justify-center gap-x-5 px-4 sm:px-12'>
        <div className='flex flex-col md:flex-row gap-5'>
          <Sidebar/>
        </div>

      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Check if the user is authenticated on the server...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }

  return {
    props: {
      session
    },
  };
}
