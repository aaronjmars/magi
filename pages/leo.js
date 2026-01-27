import Head from "next/head";
import React from "react";
import SearchLeo from "./components/SearchLeo";
import TopBanner from "./components/TopBanner";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <title>Magi - Meme search engine</title>
        <meta
          name="description"
          content="Find and search the best memes with AI."
        />
        <meta property="og:title" content="Magi - Meme search engine" />
        <meta
          property="og:description"
          content="Find and search the best memes with AI."
        />
        <meta
          property="og:image"
          content="https://imagedelivery.net/uzmvUOBJ09s_IX7VWocbxw/1b366467-f4fa-44e4-88f1-90dd366e3900/public"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Magi - Meme search engine" />
        <meta
          name="twitter:description"
          content="Find and search the best memes with AI."
        />
        <meta
          name="twitter:image"
          content="https://imagedelivery.net/uzmvUOBJ09s_IX7VWocbxw/1b366467-f4fa-44e4-88f1-90dd366e3900/public"
        />
        <meta property="og:url" content="https://magi.lol/"></meta>
        <meta name="theme-color" content="#e8791a" />

        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://imagedelivery.net/uzmvUOBJ09s_IX7VWocbxw/f54b1695-60fd-4e03-5f59-9670b6cd5900/square"
        />

        <meta property="fc:frame:image:aspect_ratio" content="1:1" />

        <meta
          property="fc:frame:post_url"
          content="https://magi.lol/api/frame-farcaster"
        />

        <meta property="fc:frame:button:1" content="Explore Magi" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="https://magi.lol/" />

        <meta property="fc:frame:button:2" content="Memes 🐸" />
        <meta property="fc:frame:button:2:action" content="post" />
      </Head>
      <main>
        <Script
          src="https://eu.umami.is/script.js"
          strategy="afterInteractive"
          data-website-id="4af2af3d-7819-46f3-b8a0-1f124f2cc89b"
          async
        />
        <div>
          <TopBanner />
          <SearchLeo />
        </div>
      </main>
    </>
  );
}
