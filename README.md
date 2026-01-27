# Magi

AI-powered meme search engine for Farcaster.

## Features

- Search memes using AI-powered semantic search
- Farcaster Frames integration for sharing memes
- Multiple meme collections (Farcaster, Degen, Higher, Enjoy)

## Tech Stack

- **Framework:** Next.js 14
- **Search:** Typesense
- **Images:** Cloudflare Images
- **Analytics:** Umami
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd magi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Fill in your `.env.local` with your actual values:
   ```
   TYPESENSE_HOST=your-typesense-host
   TYPESENSE_API_KEY=your-admin-key
   NEXT_PUBLIC_TYPESENSE_HOST=your-typesense-host
   NEXT_PUBLIC_TYPESENSE_API_SEARCH_ONLY=your-search-key
   CLOUDFLARE_IMAGES_ID=your-cloudflare-id
   NEXT_PUBLIC_CLOUDFLARE_IMAGES_ID=your-cloudflare-id
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id
   ```

### Running the App

**Development:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

**Production build:**
```bash
npm run build
npm run start
```

## Project Structure

```
pages/
├── index.js          # Main search page
├── action.js         # Farcaster action page
├── api/
│   ├── frame-farcaster.js
│   ├── frame-degen.js
│   ├── frame-higher.js
│   └── frame-enjoy.js
└── components/
    ├── Search.js     # Main search component
    ├── ActionFC.js   # Farcaster action component
    └── ...
```
