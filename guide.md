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

1. [Paper records](club-website/src/features/research/paperRecords.js) contain the title, authors, journal, year, abstract, optional `featured` flag, and imported Markdown body for each entry. Add, remove, or reorder entries here.
2. The [catalog module](club-website/src/features/research/papers.js) generates each entry's ID and URL slug. It also owns `PAPERS_PER_PAGE` and the functions for listing, finding, and navigating between papers.
3. The Research page reads `?page=` from the URL and asks the catalog for that page's records. It uses `/research` for the first page when a visitor navigates through the pagination controls.
4. The detail page looks up the record by its slug and displays the Markdown file assigned to that record.
5. `PaperBody` renders the Markdown with React Markdown and the existing KaTeX math integration. `App.jsx` loads the detail page on demand, which keeps those rendering dependencies out of the initial page bundle.

## 3. How to add a paper

You can publish a paper using GitHub in your browser. Each paper needs a Markdown file for the full article and an entry in `paperRecords.js` for the catalog card and the detail page's title and abstract. This example uses a paper called “Measuring Pendulum Periods.” Replace the example text and file name with your own when publishing.

### 1. Create a branch

Sign in to GitHub and open the `Club_web_2026` repository. On the **Code** tab, open the branch menu (usually labeled **main**), type a name such as `add-pendulum-paper`, and choose **Create branch** from `main`. If you lack write access, click **Fork** first and create the branch in your fork. [GitHub's pull request quickstart](https://docs.github.com/en/pull-requests/get-started/pull-request-quickstart)

### 2. Create the article file

On your branch, go to `club-website/src/features/research/` and click **Add file → Create new file**. Enter `bodies/measuring-pendulum-periods.md` as the file name. GitHub creates the `bodies` folder if needed. Use a unique file name with lowercase letters and hyphens. [GitHub's file creation guide](https://docs.github.com/en/repositories/working-with-files/managing-files/creating-new-files)

Copy the contents of this block into the file. Replace the headings, paragraphs, and equation with the full text of your paper. The site displays the title and abstract from the record above this body. For more examples of headings, lists, quotations, and equations, open the template and select **Raw** to copy its Markdown. [Paper body template](templates/paper-body.md)

```markdown
## Introduction

We measured how changing the length of a pendulum affected its period.

## Methods

We timed ten swings at each length and divided the elapsed time by ten.
For a small swing angle, a pendulum of length $L$ has a predicted period of

$$
T = 2\pi\sqrt{\frac{L}{g}}
$$

## Results

The 0.50 m pendulum took about 1.4 seconds per swing.
```

Click **Commit changes…**, enter a message such as `Add pendulum paper body`, and commit to your paper branch.

### 3. Add the catalog entry

Open `paperRecords.js` in the `club-website/src/features/research/` folder on the same branch. Click the pencil icon to edit it. If the file contains only `export const paperRecords = []`, replace that line with the complete example below. If it already lists papers, add the `import` at the top and copy just the new `{ ... },` entry into the existing array.

```js
import pendulumBody from './bodies/measuring-pendulum-periods.md?raw'

export const paperRecords = [
  {
    title: 'Measuring Pendulum Periods',
    authors: 'Linh Nguyen, Sam Tran',
    journal: 'Club Research Notes',
    year: '2026',
    featured: false,
    abstract: 'We timed a pendulum at several lengths and compared the measured periods with a simple model.',
    body: pendulumBody,
  },
]
```

Replace the metadata with your paper's details. Set `featured` to `true` to display the Featured badge, or omit it. Keep text values in quotes. If a value contains an apostrophe, wrap that value in double quotes. Match the import path to the Markdown file name and keep `?raw` at the end so the app reads the file as text. Use a unique name in place of `pendulumBody` for each import and use that same name after `body:` in its entry.

Click **Commit changes…** and commit to the same branch with a message such as `List pendulum paper in Research`.

### 4. Open a pull request and verify the deployment

1. In the original repository, open **Pull requests → New pull request**. Choose `main` as the **base** branch and your paper branch as the **compare** branch. For a fork, click **compare across forks** and select your fork and its paper branch. Check that the changes include the Markdown file and the catalog entry, then click **Create pull request**. Add a title and a short description, and submit it for review. [GitHub's pull request guide](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request)
2. When a Vercel preview is available on the pull request, open it and visit `/research`. Find your paper's card and check the title, journal, year, and abstract. Click **Read more** and check the authors, abstract, full article, and any equations. Refresh the paper page to verify that a direct link opens it.
3. After the pull request is merged and the production deployment is ready, repeat the catalog and paper-page checks on the club's live site.

The paper title determines the URL's last segment. For example, “Measuring Pendulum Periods” appears at `/research/measuring-pendulum-periods`. Changing the title can change that URL, so check the new link and update any links you have shared. Use a title that produces a unique, nonempty URL segment.

## 4. Backend and hosting

This repository contains a static frontend. There are currently no server endpoints, database, CMS, login, or admin dashboard to maintain. The JavaScript data files are the source of truth, and content updates are published by changing those files and deploying the updated build.

| Responsibility | Where it lives today |
| --- | --- |
| Store club and competition content | `src/data/` |
| Store and query papers | `src/features/research/paperRecords.js` lists the records and imports the article files from `bodies/`. `papers.js` handles catalog lookups in the browser. |
| Provide files at stable public URLs | `public/`. Vite copies these files into the build. |
| Serve a direct link such as `/research/some-paper` | [Vercel configuration](club-website/vercel.json) serves the app entry, then React Router opens the page. `public/_redirects` provides the equivalent rule for Netlify-style hosting. |
| Build and host the app | Vercel project settings. Use `club-website` as the root, Vite as the framework preset, `npm run build` as the build command, and `dist` as the output directory. |

The competition registration, results, and join buttons, along with the paper download and citation buttons, are placeholders. Their UI is in `Competitions.jsx` and `PaperDetail.jsx`. A future upload or publishing workflow would need a server-side entry point if it handles credentials, restricted files, or edits outside Git.

## 5. What to watch for

- **Paper links depend on titles.** A title edit can change the public URL. Check that new titles produce unique, nonempty slugs. Record order controls the catalog and previous/next links, and generated numeric IDs follow that order.
- **Pagination and layout are separate.** `PAPERS_PER_PAGE` sets how many entries appear. The Research page's grid classes set how many columns fit on each screen. When the catalog spans multiple pages, check the last page after changing the page size or the records.
- **Competition status is manual.** The page reads `Upcoming` or `Past` from the record. When a date passes, update the status in the data file.
- **Paper math supports Markdown with TeX expressions.** The renderer uses KaTeX for equations. Full LaTeX source files and their packages need a separate publishing workflow. The current Markdown configuration displays pipe tables from the template as text.
- **Browser data and public files are public.** Keep credentials, private files, and unpublished material outside the frontend source and public assets.
- **Check deep links after deployment.** Open and refresh a published paper URL when one is available. If the catalog has multiple pages, open and refresh `/research?page=2`. Open an unknown paper URL to check for `Error 467: No paper here` and the link back to Research. Also verify the dropdown closes when you select a link, press Escape, or click outside it.
