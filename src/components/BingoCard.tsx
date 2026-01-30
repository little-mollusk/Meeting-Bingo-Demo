import { BingoCard as BingoCardType } from '../types';
import { BingoSquare } from './BingoSquare';

interface Props {
  card: BingoCardType;
  winningSquares: Set<string>;
  onSquareClick: (row: number, col: number) => void;
}

export function BingoCard({ card, winningSquares, onSquareClick }: Props) {
  return (
    <div className="backdrop-blur-xl bg-white/10 p-4 rounded-3xl shadow-2xl border border-white/20">
      <div className="grid grid-cols-5 gap-2">
        {card.squares.map((row, rowIndex) =>
          row.map((square, colIndex) => (
            <BingoSquare
              key={square.id}
              square={square}
              isWinningSquare={winningSquares.has(square.id)}
              onClick={() => onSquareClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}
