# Magi

AI-powered meme search engine for Farcaster.

## Features

- Search memes using AI-powered semantic search
- Farcaster Frames integration for sharing memes
- Multiple meme collections (Farcaster, Degen, Higher, Enjoy)
- Farcaster composer action (`/action`) to search for a meme and attach it to the cast you are writing

## How it works

The web app is a search UI on top of a Typesense collection named `magi`. Each meme in the index has text fields (`image_text`, `cast_caption`, `image_type`, `image_character`, `image_object`, `image_content`, `image_color`) that the search box queries, and the images themselves are served from Cloudflare Images. The script that builds and fills the index is not part of this repo, so you need your own Typesense collection to run it.

## Tech Stack

- **Framework:** Next.js 16 (pages router), React 19
- **Search:** Typesense
- **Images:** Cloudflare Images
- **Analytics:** Umami
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 22+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aaronjmars/magi.git
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

4. Fill in your `.env.local`:

   | Variable | Used for |
   |---|---|
   | `TYPESENSE_HOST` | Typesense host for the server-side frame routes |
   | `TYPESENSE_API_KEY` | Typesense key for the frame routes (server only) |
   | `NEXT_PUBLIC_TYPESENSE_HOST` | Typesense host for the browser search |
   | `NEXT_PUBLIC_TYPESENSE_API_SEARCH_ONLY` | Search-only Typesense key (exposed to the browser) |
   | `CLOUDFLARE_IMAGES_ID` | Cloudflare Images account hash for frame images |
   | `NEXT_PUBLIC_CLOUDFLARE_IMAGES_ID` | Cloudflare Images account hash for the web app |
   | `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami analytics site ID |

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
│   ├── action.js     # Composer action handler (opens /action)
│   ├── frame-farcaster.js
│   ├── frame-degen.js
│   ├── frame-higher.js
│   └── frame-enjoy.js
└── components/
    ├── Search.js     # Main search component
    ├── ActionFC.js   # Farcaster action component
    └── ...
```

Frame and action URLs are hardcoded to `magi.lol` in `pages/api/` and the page meta tags. Change them if you deploy under another domain.

---

Built by [Aaron Elijah Mars](https://aaronjmars.com), founder of Aeon and MiroShark · [@aaronjmars](https://github.com/aaronjmars)
