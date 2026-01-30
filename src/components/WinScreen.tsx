import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GameState } from '../types';

interface Props {
  game: GameState;
  onPlayAgain: () => void;
  onHome: () => void;
  onShare: () => void;
}

export function WinScreen({ game, onPlayAgain, onHome, onShare }: Props) {
  useEffect(() => {
    // Epic confetti celebration!
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: ['#a855f7', '#ec4899', '#06b6d4', '#22c55e', '#f59e0b'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: ['#a855f7', '#ec4899', '#06b6d4', '#22c55e', '#f59e0b'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Big burst at start
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#a855f7', '#ec4899', '#06b6d4', '#22c55e', '#f59e0b'],
    });
  }, []);

  const getTimeElapsed = () => {
    if (!game.startedAt || !game.completedAt) return '0:00';
    const seconds = Math.floor((game.completedAt - game.startedAt) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 relative overflow-hidden">
      {/* Floating celebration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🎉</div>
        <div className="absolute top-20 right-16 text-5xl animate-pulse">🏆</div>
        <div className="absolute bottom-32 left-16 text-6xl animate-bounce" style={{ animationDelay: '0.3s' }}>🥳</div>
        <div className="absolute bottom-20 right-20 text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute top-1/3 left-1/4 text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</div>
        <div className="absolute top-1/2 right-1/4 text-4xl animate-pulse" style={{ animationDelay: '0.4s' }}>💫</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center animate-bounce-in">
        <div className="backdrop-blur-xl bg-white/20 rounded-3xl p-10 border border-white/30 shadow-2xl max-w-lg">
          <div className="text-8xl mb-4">🎯</div>

          <h1 className="text-7xl font-black text-white mb-4 drop-shadow-lg">
            BINGO!
          </h1>

          <p className="text-2xl text-white/90 mb-2">
            🏆 You won with:
          </p>
          <p className="text-3xl font-bold text-yellow-300 mb-6 drop-shadow">
            "{game.winningWord}"
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6 my-8">
            <div className="backdrop-blur bg-white/20 rounded-2xl px-6 py-4 border border-white/30">
              <div className="text-3xl font-black text-white">{game.filledCount}</div>
              <div className="text-sm text-white/80">✅ Squares</div>
            </div>
            <div className="backdrop-blur bg-white/20 rounded-2xl px-6 py-4 border border-white/30">
              <div className="text-3xl font-black text-white">{getTimeElapsed()}</div>
              <div className="text-sm text-white/80">⏱️ Time</div>
            </div>
            <div className="backdrop-blur bg-white/20 rounded-2xl px-6 py-4 border border-white/30">
              <div className="text-3xl font-black text-white capitalize">{game.winningLine?.type}</div>
              <div className="text-sm text-white/80">📐 Win Type</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={onPlayAgain}
              className="group px-8 py-4 bg-white text-emerald-600 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <span>🔄</span>
              <span>Play Again</span>
            </button>
            <button
              onClick={onShare}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <span>📤</span>
              <span>Share</span>
            </button>
            <button
              onClick={onHome}
              className="group px-8 py-4 backdrop-blur bg-white/20 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30 flex items-center gap-2"
            >
              <span>🏠</span>
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
