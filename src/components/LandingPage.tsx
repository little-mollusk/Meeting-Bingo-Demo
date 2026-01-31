interface Props {
  onStart: () => void;
}

export function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20">🎯</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20">✨</div>
        <div className="absolute bottom-32 left-20 text-7xl opacity-20">🎲</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-20">🏆</div>
      </div>

      {/* Glass card */}
      <div className="relative backdrop-blur-xl bg-white/20 rounded-3xl p-10 shadow-2xl border border-white/30 max-w-md text-center">
        <div className="text-8xl mb-6">🎯</div>

        <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
          Meeting Bingo
        </h1>

        <p className="text-xl text-white/90 mb-8 leading-relaxed">
          Turn boring meetings into a game! 🎮<br />
          Listen for buzzwords and mark your card.
        </p>

        <button
          onClick={onStart}
          className="group px-10 py-5 bg-white text-purple-600 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 mx-auto"
        >
          <span>🚀</span>
          <span>Let's Play!</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
}
