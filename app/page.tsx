export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full gap-12 px-4 overflow-hidden">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-pink-500/25 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute top-2/3 left-1/6 w-64 h-64 rounded-full bg-indigo-400/20 blur-3xl" />
      </div>

      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl font-bold text-white/90">Pokémon Explorer</h1>
        <p className="text-lg text-white/60">
          Created by Reynaldi Rangga Prayuda —
          <a
            href="https://reynaldirp.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-white transition-colors underline underline-offset-2"
          >
            reynaldirp.vercel.app
          </a>
        </p>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href="/pokemon"
          className="glass-button px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform"
        >
          Browse Pokémon
        </a>
        <a
          href="/berries"
          className="glass-button px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform"
        >
          Explore Berries
        </a>
      </div>
    </main>
  );
}
