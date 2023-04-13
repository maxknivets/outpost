import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

// pages/index.js
export async function getServerSideProps(context) {
  const { URL } = process.env;
  const data = (await axios.get(URL + 'api/query')).data.splice(0, 5);
  
  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }) {

  return (
    <div className="text-center">
      <h1 className="text-5xl font-light my-4 ">Outpost</h1>
      <h2>database of asteroid-asteroid approaches & impacts</h2>
      <div className="flex flex-col w-full items-center mt-4">
        {data.map((column: string[], index: number) => (
          <div key={index} className="grid grid-cols-8">
            {column.slice(0, 8).map((item: string, index: number) => (
              <div key={index} className="border border-black p-2 w-24 overflow-scroll">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
      <footer className="w-full text-2xl flex flex-col absolute bottom-8">
        <Link href="/contact">Contact</Link>
        <Link href="/donate">Donate</Link>
      </footer>
    </div>
  )
}
