import PageHeader from '../components/PageHeader'
import { competitions } from '../data/competitions'

function CompetitionCard({ competition }) {
  const isUpcoming = competition.status === 'Upcoming'

  return (
    <article
      className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-teal hover:shadow-lg md:flex-row md:items-start"
    >
      <span
        className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
          isUpcoming ? 'bg-teal text-white' : 'bg-gray-200 text-gray-600'
        }`}
      >
        {competition.status}
      </span>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{competition.name}</h3>
        <p className="mt-1 text-sm text-gray-600">{competition.desc}</p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
          <span>📅 {competition.date}</span>
          <span>📍 {competition.location}</span>
          <span>🏆 {competition.prize}</span>
        </div>
      </div>
      <button
        className={`shrink-0 rounded-lg px-5 py-2 text-sm font-semibold transition ${
          isUpcoming
            ? 'bg-teal text-white hover:bg-teal-dark'
            : 'border border-gray-300 text-gray-600 hover:border-teal hover:text-teal'
        }`}
      >
        {isUpcoming ? 'Register (placeholder)' : 'Results (placeholder)'}
      </button>
    </article>
  )
}

export default function Competitions() {
  return (
    <>
      <PageHeader title="Competitions">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder
        introduction for the competitions section — list your events,
        results, and how to participate.
      </PageHeader>

      {/* Competition list */}
      <section className="mx-auto max-w-6xl px-4 py-12 pb-16">
        <h2 className="text-2xl font-bold">Events (placeholder)</h2>
        {competitions.length === 0 ? (
          <p lang="vi" className="mt-8 text-center text-gray-600">
            Hiện tại không có cuộc thi nào
          </p>
        ) : (
          <div className="mt-8 space-y-6">
            {competitions.map((competition) => (
              <CompetitionCard key={competition.name} competition={competition} />
            ))}
          </div>
        )}

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
