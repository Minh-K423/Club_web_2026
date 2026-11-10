import { Link } from 'react-router-dom'
import { club } from '../data/club'
import { siteLinks } from '../navigation'

const cards = [
  {
    ...siteLinks.research,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder description for the research section.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    ),
  },
  {
    ...siteLinks.about,
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placeholder description for the about section.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4m4 4a4 4 0 01-4-4m4 4v.01"
      />
    ),
  },
  {
    ...siteLinks.competitions,
    desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco. Placeholder description for the competitions section.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 21h8m-4-4v4m-6-17h12v4a6 6 0 01-12 0V4zm12 2h3a1 1 0 011 1c0 2.5-2 4-4 4M6 6H3a1 1 0 00-1 1c0 2.5 2 4 4 4"
      />
    ),
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center md:py-32">
          <span className="mb-6 inline-block rounded-full border border-teal px-4 py-1 text-xs font-semibold uppercase tracking-widest text-teal-light">
            Placeholder badge
          </span>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Welcome to <span className="text-teal-light">{club.name}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. This is
            placeholder text — replace it with your own introduction.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to={siteLinks.research.to}
              className="rounded-lg bg-teal px-6 py-3 font-semibold text-white transition hover:bg-teal-dark"
            >
              Explore research
            </Link>
            <Link
              to={siteLinks.about.to}
              className="rounded-lg border border-white/30 px-6 py-3 font-semibold transition hover:border-teal hover:text-teal-light"
            >
              About us
            </Link>
          </div>
        </div>
      </section>

      {/* Section cards */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Explore the club</h2>
        <p className="mt-2 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Use the menu
          above or the cards below to navigate.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:border-teal hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal transition group-hover:bg-teal group-hover:text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {card.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-semibold">{card.label}</h3>
              <p className="mt-2 text-sm text-gray-600">{card.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal">
                Learn more
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Placeholder text band */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Lorem ipsum section</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adiping elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
