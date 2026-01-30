// Category & Words
export type CategoryId = 'agile' | 'corporate' | 'tech';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  words: string[];
}

// Bingo Card
export interface BingoSquare {
  id: string;
  word: string;
  isFilled: boolean;
  isAutoFilled: boolean;
  isFreeSpace: boolean;
  filledAt: number | null;
  row: number;
  col: number;
}

export interface BingoCard {
  squares: BingoSquare[][];
  words: string[];
}

// Game State
export type GameStatus = 'idle' | 'setup' | 'playing' | 'won';

export interface WinningLine {
  type: 'row' | 'column' | 'diagonal';
  index: number;
  squares: string[];
}

export interface GameState {
  status: GameStatus;
  category: CategoryId | null;
  card: BingoCard | null;
  isListening: boolean;
  startedAt: number | null;
  completedAt: number | null;
  winningLine: WinningLine | null;
  winningWord: string | null;
  filledCount: number;
}

// Speech Recognition
export interface SpeechRecognitionState {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
}

// UI
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  duration?: number;
}
