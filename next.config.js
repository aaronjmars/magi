/** @type {import('next').NextConfig} */
module.exports = {
  // typesense-instantsearch-adapter v3 ships ESM-syntax `.js` files without a
  // `type: "module"` field and with extension-less relative imports, which
  // breaks Node's ESM loader when the package is externalized for SSR. Letting
  // Next transpile/bundle it makes the bundler resolve those imports instead.
  transpilePackages: ["typesense-instantsearch-adapter"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      },
    ],
}
}