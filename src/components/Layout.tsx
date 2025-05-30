import React, { ReactNode } from "react";
import Head from "next/head";
import { Roboto } from 'next/font/google'

type Props = {
  children?: ReactNode;
  title?: string;
};

const roboto = Roboto({
  weight: ['100','400','700'],
  display: "block",
  style: ['italic', 'normal'],
  variable: '--font-roboto',
  subsets: ['latin']
})

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&display=swap');
      </style>
    </Head>
    <main className={roboto.className}>{children}</main>
  </div>
);

export default Layout;
