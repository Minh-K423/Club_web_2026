export default function PageHeader({ title, children }) {
  return (
    <section className="border-b-4 border-teal bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-gray-300">{children}</p>
      </div>
    </section>
  )
}
