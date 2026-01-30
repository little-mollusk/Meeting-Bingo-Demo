import { BingoSquare as BingoSquareType } from '../types';
import { cn } from '../lib/utils';

interface Props {
  square: BingoSquareType;
  isWinningSquare: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinningSquare, onClick }: Props) {
  const { word, isFilled, isAutoFilled, isFreeSpace } = square;

  return (
    <button
      onClick={onClick}
      disabled={isFreeSpace}
      className={cn(
        'aspect-square p-1.5 rounded-xl transition-all duration-300',
        'flex items-center justify-center text-center',
        'text-[10px] sm:text-xs font-semibold leading-tight',
        'hover:scale-105 active:scale-95',
        'shadow-md hover:shadow-lg',
        // Default unfilled state
        !isFilled && 'bg-white/90 backdrop-blur text-gray-700 hover:bg-white border-2 border-transparent hover:border-purple-300',
        // Filled state
        isFilled && !isFreeSpace && !isWinningSquare && 'bg-gradient-to-br from-violet-500 to-purple-600 text-white border-2 border-purple-400',
        // Auto-filled animation
        isAutoFilled && !isWinningSquare && 'animate-pulse ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent',
        // Free space
        isFreeSpace && 'bg-gradient-to-br from-amber-400 to-orange-500 text-white cursor-default border-2 border-amber-300',
        // Winning square
        isWinningSquare && 'bg-gradient-to-br from-emerald-400 to-green-500 text-white border-2 border-green-300 ring-2 ring-green-300 ring-offset-2 ring-offset-transparent scale-105',
      )}
    >
      <span className={cn(
        'break-words px-0.5',
        isFilled && !isFreeSpace && !isWinningSquare && 'line-through opacity-90'
      )}>
        {isFreeSpace ? '⭐ FREE' : word}
      </span>
    </button>
  );
}
