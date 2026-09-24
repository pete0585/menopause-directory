'use client'

export default function DirectoryError({ reset }: { reset: () => void }) {
  return <main className="max-w-xl mx-auto p-8" role="alert">
    <h1 className="text-2xl font-bold mb-4">Directory temporarily unavailable</h1>
    <p className="mb-4">We could not load the directory data. This is a service error, not a search with no matching providers.</p>
    <button className="rounded bg-slate-900 text-white px-5 py-3" onClick={reset}>Try again</button>
  </main>
}
