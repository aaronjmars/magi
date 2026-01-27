import Head from "next/head";
import React from "react";
import ActionFC from "./components/ActionFC";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <title>Magi - Join the Farcaster meme revolution.</title>
        <meta
          name="description"
          content="Find the best Farcaster memes with AI, share them and fucking win."
        />
        <meta
          property="og:title"
          content="Magi - Join the Farcaster meme revolution."
        />
        <meta
          property="og:description"
          content="Find the best Farcaster memes with AI, share them and fucking win."
        />
        <meta
          property="og:image"
          content={`https://imagedelivery.net/${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ID}/1b366467-f4fa-44e4-88f1-90dd366e3900/public`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Magi - Join the Farcaster meme revolution."
        />
        <meta
          name="twitter:description"
          content="Find the best Farcaster memes with AI, share them and fucking win."
        />
        <meta
          name="twitter:image"
          content={`https://imagedelivery.net/${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ID}/1b366467-f4fa-44e4-88f1-90dd366e3900/public`}
        />
        <meta property="og:url" content="https://magi.lol/"></meta>
        <meta name="theme-color" content="#e8791a" />
      </Head>
      <main>
        <Script
          src="https://eu.umami.is/script.js"
          strategy="afterInteractive"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          async
        />
        <div>
          <ActionFC instance="magi-farcaster" />
        </div>
      </main>
    </>
  );
}
