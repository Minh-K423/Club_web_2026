const competitions = [
  {
    name: 'Annual Science Fair 2026',
    status: 'Upcoming',
    date: 'March 15, 2026 (placeholder)',
    location: 'Main Auditorium (placeholder)',
    prize: 'Prize pool: $1,000 (placeholder)',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Open to all members — placeholder description of the competition.',
  },
  {
    name: 'Hackathon: Code for Good',
    status: 'Upcoming',
    date: 'April 22–23, 2026 (placeholder)',
    location: 'Innovation Lab (placeholder)',
    prize: 'Prize pool: $2,500 (placeholder)',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 48-hour hackathon — placeholder description.',
  },
  {
    name: 'Regional Math Olympiad',
    status: 'Upcoming',
    date: 'May 10, 2026 (placeholder)',
    location: 'Science Building (placeholder)',
    prize: 'Medals & certificates (placeholder)',
    desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Individual and team rounds — placeholder description.',
  },
  {
    name: 'National Robotics Challenge 2025',
    status: 'Past',
    date: 'November 8, 2025 (placeholder)',
    location: 'Convention Center (placeholder)',
    prize: '2nd place (placeholder)',
    desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore. Our club placed second — placeholder description.',
  },
  {
    name: 'Inter-University Debate Cup',
    status: 'Past',
    date: 'October 12, 2025 (placeholder)',
    location: 'Lecture Hall B (placeholder)',
    prize: 'Best speaker award (placeholder)',
    desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim — placeholder description.',
  },
]

export default function Competitions() {
  return (
    <>
      {/* Page header */}
      <section className="border-b-4 border-teal bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-3xl font-bold md:text-5xl">
            Competitions
          </h1>
          <p className="mt-4 max-w-2xl text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder
            introduction for the competitions section — list your events,
            results, and how to participate.
          </p>
        </div>
      </section>

      {/* Competition list */}
      <section className="mx-auto max-w-6xl px-4 py-12 pb-16">
        <h2 className="text-2xl font-bold">Events (placeholder)</h2>
        <div className="mt-8 space-y-6">
          {competitions.map((comp) => (
            <article
              key={comp.name}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-teal hover:shadow-lg md:flex-row md:items-start"
            >
              <span
                className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
                  comp.status === 'Upcoming'
                    ? 'bg-teal text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {comp.status}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{comp.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{comp.desc}</p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
                  <span>📅 {comp.date}</span>
                  <span>📍 {comp.location}</span>
                  <span>🏆 {comp.prize}</span>
                </div>
              </div>
              <button
                className={`shrink-0 rounded-lg px-5 py-2 text-sm font-semibold transition ${
                  comp.status === 'Upcoming'
                    ? 'bg-teal text-white hover:bg-teal-dark'
                    : 'border border-gray-300 text-gray-600 hover:border-teal hover:text-teal'
                }`}
              >
                {comp.status === 'Upcoming' ? 'Register (placeholder)' : 'Results (placeholder)'}
              </button>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-black p-8 text-center text-white">
          <h2 className="text-2xl font-bold">
            Want to <span className="text-teal-light">participate</span>?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder
            text on how to join the club and sign up for competitions.
          </p>
          <button className="mt-6 rounded-lg bg-teal px-6 py-3 font-semibold text-white transition hover:bg-teal-dark">
            Join us (placeholder)
          </button>
        </div>
      </section>
    </>
  )
}
