# Club website maintainer guide

The club website is a React single-page app built with Vite. React Router selects a page from the URL, Tailwind supplies the styling, and JavaScript modules hold the site content. Vercel serves the built site as static files.

## 1. Project architecture

```text
Club_web_2026/
├── README.md                       Repository entry point
├── guide.md                        This guide
└── club-website/                   Application and deployment root
    ├── index.html                  HTML entry, browser tab title, and favicon link
    ├── package.json                Dependencies and npm scripts
    ├── package-lock.json           Locked dependency versions
    ├── vite.config.js              Vite, React, and Tailwind setup
    ├── eslint.config.js            JavaScript and React lint rules
    ├── vercel.json                 Vercel fallback for browser routes
    ├── public/                     Static files served at the site root
    └── src/
        ├── main.jsx                Mounts React inside BrowserRouter
        ├── App.jsx                 Shared layout, routes, and scroll reset
        ├── navigation.js           Route paths, menu labels, and paper URLs
        ├── index.css               Theme colors, global styles, and paper typography
        ├── assets/                 Images available for import by the app
        ├── components/             Shared navigation, footer, page header, pagination
        ├── data/                   Club profile, About page data, competition records
        ├── features/research/      Paper records, catalog logic, and research components
        ├── pages/                  Page layout for each route
        └── utils/                  Utility for turning paper titles into URL slugs
```

`node_modules/` is created by npm and `dist/` is created by the build. Both are ignored by Git. To work locally, open a terminal at the repository root with Node.js and npm available. Node.js 24 is a suitable version for this project.

```sh
cd club-website
npm ci
npm run dev
```

Vite prints the local address. To check a change before publishing, run `npm run lint` and `npm run build`. Use `npm run preview` after building to inspect the production output locally.

## 2. Frontend maintenance

Each route has a page component. The shared navbar and footer surround all pages. Research-specific code sits in its own folder because the catalog and paper reader use the same records and lookup functions.

| What to change | Where to edit |
| --- | --- |
| Club name, logo initial, footer description, or contact details | [Club profile](club-website/src/data/club.js). The name is used on the home page, navbar, and footer. |
| Browser tab title and favicon | [HTML entry](club-website/index.html) and [favicon](club-website/public/favicon.svg). The tab title is set separately from the club profile. |
| Menu labels and link order | [Navigation configuration](club-website/src/navigation.js). `menuLinks` controls the navbar and `exploreLinks` controls the footer. The home cards use the same section labels and paths. |
| Add or wire a route | [App routes](club-website/src/App.jsx) and [navigation configuration](club-website/src/navigation.js). |
| Menu interactions or footer layout | [Navbar](club-website/src/components/Navbar.jsx) and [Footer](club-website/src/components/Footer.jsx). |
| Shared page banner styling | [PageHeader](club-website/src/components/PageHeader.jsx). About, Research, and Competitions supply their own titles and introductions. |
| Global colors, base typography, or rendered article styling | [Global stylesheet](club-website/src/index.css). Most layout styles are Tailwind classes in the relevant JSX. |
| Home hero, section descriptions, icons, or card order (`/`) | [Home page](club-website/src/pages/Home.jsx). |
| Mission and vision layout or copy (`/about`) | [About page](club-website/src/pages/About.jsx). Edit team and statistics in [About data](club-website/src/data/about.js). |
| Competition list (`/competitions`) | Edit event names, dates, venues, prizes, and status in [competition data](club-website/src/data/competitions.js). Edit card layout or participation copy in the [Competitions page](club-website/src/pages/Competitions.jsx). |
| Research catalog (`/research`) | Edit the introduction, grid, and URL pagination in the [Research page](club-website/src/pages/Research.jsx). The [paper card](club-website/src/features/research/PaperCard.jsx) controls each result, and the [pagination component](club-website/src/components/Pagination.jsx) controls the buttons. |
| Individual paper page (`/research/:slug`) | Edit the title area, abstract, missing-paper message, and placeholder actions in the [paper detail page](club-website/src/pages/PaperDetail.jsx). The [body renderer](club-website/src/features/research/PaperBody.jsx) and [previous/next links](club-website/src/features/research/PaperNavigation.jsx) are separate. |

### How a paper reaches its page

1. [Paper records](club-website/src/features/research/paperRecords.js) contain the title, authors, journal, year, abstract, and optional `featured` flag for each entry. Add, remove, or reorder entries here.
2. The [catalog module](club-website/src/features/research/papers.js) builds each entry's ID, URL slug, and Markdown body. It also owns `PAPERS_PER_PAGE` and the functions for listing, finding, and navigating between papers.
3. The Research page reads `?page=` from the URL and asks the catalog for that page's records. It uses `/research` for the first page when a visitor navigates through the pagination controls.
4. The detail page looks up a record by its slug. The [shared sample body](club-website/src/features/research/samplePaperBody.js) generates placeholder Markdown for every paper. Editing it affects every sample article.
5. `PaperBody` renders the Markdown with React Markdown and the existing KaTeX math integration. `App.jsx` loads the detail page on demand, which keeps those rendering dependencies out of the initial page bundle.

## 3. Backend and hosting

This repository contains a static frontend. There are currently no server endpoints, database, CMS, login, or admin dashboard to maintain. The JavaScript data files are the source of truth, and content updates are published by changing those files and deploying the updated build.

| Responsibility | Where it lives today |
| --- | --- |
| Store club and competition content | `src/data/` |
| Store and query paper metadata | `src/features/research/paperRecords.js` and `papers.js`, in the browser |
| Provide files at stable public URLs | `public/`. Vite copies these files into the build. |
| Serve a direct link such as `/research/some-paper` | [Vercel configuration](club-website/vercel.json) serves the app entry, then React Router opens the page. `public/_redirects` provides the equivalent rule for Netlify-style hosting. |
| Build and host the app | Vercel project settings. Use `club-website` as the root, Vite as the framework preset, `npm run build` as the build command, and `dist` as the output directory. |

The competition registration, results, and join buttons, along with the paper download and citation buttons, are placeholders. Their UI is in `Competitions.jsx` and `PaperDetail.jsx`. A future upload or publishing workflow would need a server-side entry point if it handles credentials, restricted files, or edits outside Git.

## 4. What to watch for

- **Paper links depend on titles.** A title edit can change the public URL. Check that new titles produce unique, nonempty slugs. Record order controls the catalog and previous/next links, and generated numeric IDs follow that order.
- **Pagination and layout are separate.** `PAPERS_PER_PAGE` sets how many entries appear. The Research page's grid classes set how many columns fit on each screen. Check both pages after editing the count or the records.
- **Competition status is manual.** The page reads `Upcoming` or `Past` from the record. When a date passes, update the status in the data file.
- **Paper math supports Markdown with TeX expressions.** The renderer uses KaTeX for equations. Full LaTeX source files and their packages need a separate publishing workflow. The current Markdown configuration also lacks GitHub Flavored Markdown table rendering, so pipe tables in the sample body display as text.
- **Browser data and public files are public.** Keep credentials, private files, and unpublished material outside the frontend source and public assets.
- **Check deep links after deployment.** On a Vercel preview, open and refresh `/research?page=2` and a valid paper URL. Open an unknown paper slug to check the missing-paper message. Also verify the dropdown closes when you select a link, press Escape, or click outside it.
