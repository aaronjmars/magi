import Typesense from "typesense";
import { track } from "@vercel/analytics/server";

let client = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST,
      port: "443",
      protocol: "https",
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 60,
});

const html = (url, imgurUrl) => {
  const warpcastComposeUrl = `https://warpcast.com/~/compose?embeds[]=https://magi.lol/&embeds[]=${encodeURIComponent(imgurUrl)}`;

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
    <title>Magi - Join the Farcaster meme revolution.</title>
      <meta property="og:title" content="Magi - Join the Farcaster meme revolution.">
      <meta property="og:image" content="${url}">
      <meta name="fc:frame" content="vNext">
      <meta name="fc:frame:image" content="${url}">

      <meta property="fc:frame:post_url" content="https://magi.lol/api/frame-farcaster" />

      <meta property="fc:frame:button:1" content="Explore Magi" />
      <meta property="fc:frame:button:1:action" content="link" />
      <meta property="fc:frame:button:1:target" content="https://magi.lol/" />

      <meta property="fc:frame:button:2" content="Memes 🐸" />
      <meta property="fc:frame:button:2:action" content="post" />
      <meta property="fc:frame:image:aspect_ratio" content="1:1" />

      <meta property="fc:frame:button:3" content="Cast 🔥" />
      <meta property="fc:frame:button:3:action" content="link" />
      <meta property="fc:frame:button:3:target" content="${warpcastComposeUrl}" />
      
    </head>
    <body class="flex min-h-screen flex-col items-center justify-center">
      <img src="${url}" alt="Magi.lol" class="max-h-screen w-auto h-full"/>
    </body>
  </html>
  `;
};

async function getImage() {
  const randomPage = Math.floor(Math.random() * 57) + 1;

  let searchParameters = {
    q: "*",
    query_by: "image_url",
    limit: "250",
    page: randomPage,
  };

  const result = await client
    .collections("magi-farcaster")
    .documents()
    .search(searchParameters);

  if (result && result.hits && result.hits.length > 0) {
    const documentsLength = result.hits.length;
    const randomIndex = Math.floor(Math.random() * documentsLength);
    const randomDocument = result.hits[randomIndex];

    const timestamp = Date.now();
    const hostedImageId = randomDocument.document.hosted_image_id;
    const imgurUrl = randomDocument.document.image_url;
    const imageUrl = `https://imagedelivery.net/${process.env.CLOUDFLARE_IMAGES_ID}/${hostedImageId}/square?${timestamp}`;
    console.log(`Fetched image : ${imageUrl}`);
    return { imageUrl, imgurUrl };
  }
}

export default async function handler(req, res) {
  console.log(`${req.method} request received`);

  if (req.method === "GET") {
    const imageUrl = await getImage();
    try {
      const loadImage = await fetch(imageUrl);
      if (!loadImage.ok) throw new Error("Failed to load image");

      const blob = await loadImage.blob();
      if (!blob) throw new Error("Failed to convert response to blob");

      console.log(`Successfully served image blob`);
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "max-age=10");
      res.status(200).send(blob);
    } catch (error) {
      console.error(error.message);
      res.status(404).send(error.message);
    }
    return;
  }

  if (req.method === "POST") {
    const { imageUrl, imgurUrl } = await getImage();
    await track("Farcaster meme fetched");
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html(imageUrl, imgurUrl));
    return;
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
