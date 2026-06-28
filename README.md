# Blog Editorial Layout

A responsive blog post layout built as a technical test, featuring a sticky sidebar, dark mode, scroll-synced table of contents, and full accessibility support.

## Tech Stack

- **Angular 20** (standalone components, signals, zoneless change detection)
- **Tailwind CSS v3** for utility-first styling
- **TypeScript** throughout

## Running Locally

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser. The app hot-reloads on file changes.

```bash
npm run build   # production build → dist/
npm test        # unit tests (Karma + Jasmine, headless Chrome)
```

## Architecture

The app is a single-page layout composed of focused, standalone Angular components:

```
src/app/
├── components/
│   ├── header/      # sticky nav bar + dark mode toggle
│   ├── footer/      # site footer
│   ├── sidebar/     # author card, table of contents, tags
│   └── article/     # post header, cover image, body content
├── pages/
│   └── blog-post/   # layout shell — wires sidebar + article side-by-side
├── services/
│   ├── blog.service.ts    # post data + active heading signal
│   └── theme.service.ts   # dark/light mode with localStorage persistence
└── models/
    └── blog-post.model.ts # BlogPost, Author, TocEntry interfaces
```

**State management** is handled entirely with Angular signals — no NgRx or external store needed at this scale. `BlogService` exposes a `post` computed signal and an `activeHeadingId` writable signal that the sidebar and article share directly.

**Article content** is loaded from a static HTML file (`public/mock-blog-article.html`) via `HttpClient` and rendered with `[innerHTML]`. This separates the editorial content from the component logic and makes it easy to swap in a real API response.

**Scroll spy** uses a single `IntersectionObserver` in `ArticleComponent` that watches all heading elements. When a heading enters the viewport, it writes to `blog.activeHeadingId`, and `SidebarComponent` reacts via a computed signal to highlight the matching TOC entry — no manual scroll event listeners.

## Design Decisions & Trade-offs

**Inline templates over separate HTML files** — with small, focused components, keeping the template inline makes each file self-contained and easier to scan. The trade-off is that larger components would benefit from a dedicated `.html` file.

**Custom `.prose-article` CSS over `@tailwindcss/typography`** — writing explicit prose styles gives full control over every element (headings, block quotes, code blocks) without fighting the plugin's defaults. The trade-off is a bit more upfront CSS to maintain.

**`flex-col-reverse` for mobile ordering** — the sidebar comes first in the DOM (for the desktop grid layout), and `flex-col-reverse` flips it below the article on mobile without duplicating markup or using `order` utilities. The trade-off is that the DOM order differs from the visual order on mobile, which requires care for screen reader users.

**Zoneless change detection** — `provideZonelessChangeDetection()` removes the Zone.js overhead and pairs cleanly with signals, which push updates explicitly. The trade-off is that any third-party code relying on Zone.js patching won't trigger change detection automatically.

**Static mock content** — article content lives in a plain HTML file rather than a hardcoded template string, keeping the component clean and making the content easy to edit without touching component code.

## Features

- **Responsive layout** — sidebar + article side-by-side on desktop (`lg:`), article-first stack on mobile
- **Sticky sidebar** with `position: sticky` and constrained max-height + scroll on tall screens
- **Dark mode** — toggle in the header, persisted to `localStorage`, respects `prefers-color-scheme` on first visit
- **Scroll-synced TOC** — active heading highlighted as you scroll, smooth-scroll on click
- **Accessibility** — semantic landmarks (`<header>`, `<main>`, `<aside>`, `<article>`, `<footer>`, `<nav>`), ARIA labels, `aria-hidden` on decorative elements, a skip-to-content link, and keyboard-navigable controls
