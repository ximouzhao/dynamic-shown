# Dynamic Concepts

A modern web application for displaying AI-generated static content pages that dynamically explain concepts. Built with Next.js 14 and designed for easy deployment on Vercel.

## Features

- 📖 Dynamic concept pages with markdown support
- 🎨 Modern, responsive design with Tailwind CSS
- 🚀 Optimized for Vercel deployment
- 📝 Easy content management via markdown files
- 🔍 SEO-friendly static generation
- 📱 Mobile-responsive interface

## Project Structure

```
dynamic-shown/
├── app/                    # Next.js app directory
│   ├── concepts/          # Concept pages
│   │   └── [slug]/        # Dynamic routes for individual concepts
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── components/            # Reusable React components
├── content/              # Markdown files for concepts
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd dynamic-shown
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Content

To add a new concept, create an HTML file in the `content/` directory:

```html
<!-- META
{
  "title": "Your Concept Title",
  "description": "A brief description of the concept",
  "tags": ["tag1", "tag2", "tag3"],
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
-->

<div style="font-family: sans-serif; line-height: 1.6;">
  <h1>Your Concept Title</h1>
  <p>Your HTML content goes here...</p>
  <!-- You can use any HTML, CSS, and inline styles -->
</div>
```

The filename (without `.html`) will become the URL slug (e.g., `my-concept.html` → `/concepts/my-concept`).

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: HTML files with metadata
- **Deployment**: Vercel

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding Features

The project is structured to be easily extensible:

- Add new components in `components/`
- Add utility functions in `lib/`
- Modify global styles in `app/globals.css`
- Configure in `next.config.ts` and `tailwind.config.ts`

## Content Management

### Frontmatter Fields

- `title`: The display title of the concept
- `description`: Brief description (used for SEO and preview)
- `tags`: Array of tags for categorization
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### HTML Features

The app supports:
- Full HTML markup
- Inline CSS styling
- JavaScript (if needed)
- Rich media content
- Custom layouts and designs
- Complete creative freedom for AI-generated content

## License

This project is open source and available under the MIT License.