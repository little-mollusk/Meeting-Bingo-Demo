import { GameState } from '../types';
import { BingoCard } from './BingoCard';
import { GameControls } from './GameControls';

interface Props {
  game: GameState;
  winningSquares: Set<string>;
  onSquareClick: (row: number, col: number) => void;
  onToggleListening: () => void;
  onNewCard: () => void;
  onBack: () => void;
  children?: React.ReactNode;
}

export function GameBoard({
  game,
  winningSquares,
  onSquareClick,
  onToggleListening,
  onNewCard,
  onBack,
  children
}: Props) {
  if (!game.card) return null;

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🎯</div>
        <div className="absolute top-20 right-20 text-3xl animate-pulse">✨</div>
        <div className="absolute bottom-40 left-20 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎲</div>
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium"
          >
            <span>←</span>
            <span>🏠 Exit</span>
          </button>

          <div className="backdrop-blur-xl bg-white/20 px-4 py-2 rounded-full border border-white/30 text-white font-bold flex items-center gap-2">
            <span>✅</span>
            <span>{game.filledCount}</span>
            <span className="text-white/60">/</span>
            <span>25</span>
          </div>
        </div>

        {/* Bingo Card */}
        <BingoCard
          card={game.card}
          winningSquares={winningSquares}
          onSquareClick={onSquareClick}
        />

        {/* Controls */}
        <GameControls
          isListening={game.isListening}
          onToggleListening={onToggleListening}
          onNewCard={onNewCard}
        />

        {/* Transcript Panel */}
        {children}
      </div>
    </div>
  );
}
