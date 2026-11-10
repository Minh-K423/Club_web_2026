import PageHeader from '../components/PageHeader'
import { stats, team } from '../data/about'

export default function About() {
  return (
    <>
      <PageHeader
        title={
          <>
            About <span className="text-teal-light">us</span>
          </>
        }
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder
        introduction for the about section — tell your club's story here.
      </PageHeader>

      {/* Mission & vision */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5-2 4-5 4-9s-1.5-7-4-9c-2.5 2-4 5-4 9s1.5 7 4 9z"
                />
              </svg>
            </span>
            <h2 className="mt-4 text-xl font-bold">Our mission (placeholder)</h2>
            <p className="mt-2 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
            <h2 className="mt-4 text-xl font-bold">Our vision (placeholder)</h2>
            <p className="mt-2 text-gray-600">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-teal md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-4 py-12 pb-16">
        <h2 className="text-2xl font-bold">Meet the team (placeholder)</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:border-teal hover:shadow-lg"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal text-xl font-bold text-white">
                {member.initials}
              </span>
              <h3 className="mt-4 font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
