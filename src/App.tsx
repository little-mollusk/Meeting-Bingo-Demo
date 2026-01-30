import { useState } from 'react';
import { GameState, CategoryId } from './types';
import { LandingPage } from './components/LandingPage';
import { CategorySelect } from './components/CategorySelect';
import { GameBoard } from './components/GameBoard';
import { WinScreen } from './components/WinScreen';
import { generateCard } from './lib/cardGenerator';
import { checkForBingo, countFilled } from './lib/bingoChecker';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { TranscriptPanel } from './components/TranscriptPanel';
import { detectWordsWithAliases } from './lib/wordDetector';
import { shareResult } from './lib/shareUtils';

type Screen = 'landing' | 'category' | 'game' | 'win';

const initialGameState: GameState = {
  status: 'idle',
  category: null,
  card: null,
  isListening: false,
  startedAt: null,
  completedAt: null,
  winningLine: null,
  winningWord: null,
  filledCount: 0,
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [game, setGame] = useState<GameState>(initialGameState);
  const [winningSquares, setWinningSquares] = useState<Set<string>>(new Set());
  const [detectedWords, setDetectedWords] = useState<string[]>([]);

  const speech = useSpeechRecognition();

  const handleStart = () => {
    setScreen('category');
  };

  const handleCategorySelect = (categoryId: CategoryId) => {
    const card = generateCard(categoryId);
    setGame({
      status: 'playing',
      category: categoryId,
      card,
      isListening: false,
      startedAt: Date.now(),
      completedAt: null,
      winningLine: null,
      winningWord: null,
      filledCount: 1, // Free space
    });
    setWinningSquares(new Set());
    setScreen('game');
  };

  const handleSquareClick = (row: number, col: number) => {
    if (!game.card) return;

    const square = game.card.squares[row][col];
    if (square.isFreeSpace) return;

    // Toggle the square
    const newSquares = game.card.squares.map((r, ri) =>
      r.map((s, ci) => {
        if (ri === row && ci === col) {
          return {
            ...s,
            isFilled: !s.isFilled,
            filledAt: !s.isFilled ? Date.now() : null,
          };
        }
        return s;
      })
    );

    const newCard = { ...game.card, squares: newSquares };
    const winningLine = checkForBingo(newCard);
    const filledCount = countFilled(newCard);

    if (winningLine) {
      setWinningSquares(new Set(winningLine.squares));
      setGame(prev => ({
        ...prev,
        card: newCard,
        status: 'won',
        completedAt: Date.now(),
        winningLine,
        winningWord: square.word,
        filledCount,
      }));
      // Delay before showing win screen
      setTimeout(() => setScreen('win'), 1500);
    } else {
      setGame(prev => ({
        ...prev,
        card: newCard,
        filledCount,
      }));
    }
  };

  const handleTranscriptResult = (newTranscript: string) => {
    if (!game.card) return;

    const filledWords = new Set(
      game.card.squares
        .flat()
        .filter(s => s.isFilled)
        .map(s => s.word.toLowerCase())
    );

    const detected = detectWordsWithAliases(newTranscript, game.card.words, filledWords);

    if (detected.length > 0) {
      setDetectedWords(prev => [...prev, ...detected]);

      // Auto-fill detected squares
      detected.forEach(word => {
        const square = game.card!.squares.flat().find(
          s => s.word.toLowerCase() === word.toLowerCase() && !s.isFilled
        );
        if (square) {
          handleSquareClick(square.row, square.col);
        }
      });
    }
  };

  const handleToggleListening = () => {
    if (game.isListening) {
      speech.stopListening();
      setGame(prev => ({ ...prev, isListening: false }));
    } else {
      speech.startListening(handleTranscriptResult);
      setGame(prev => ({ ...prev, isListening: true }));
    }
  };

  const handleNewCard = () => {
    if (game.category) {
      speech.stopListening();
      speech.resetTranscript();
      setDetectedWords([]);
      handleCategorySelect(game.category);
    }
  };

  const handleBackToCategory = () => {
    setScreen('category');
  };

  const handleBackToHome = () => {
    setScreen('landing');
    setGame(initialGameState);
    setWinningSquares(new Set());
  };

  const handlePlayAgain = () => {
    setScreen('category');
    setWinningSquares(new Set());
  };

  const handleShare = async () => {
    const success = await shareResult(game);
    if (success) {
      // Could show a toast here
      console.log('Shared successfully!');
    }
  };

  return (
    <div className="min-h-screen">
      {screen === 'landing' && (
        <LandingPage onStart={handleStart} />
      )}
      {screen === 'category' && (
        <CategorySelect
          onSelect={handleCategorySelect}
          onBack={handleBackToHome}
        />
      )}
      {screen === 'game' && game.card && (
        <GameBoard
          game={game}
          winningSquares={winningSquares}
          onSquareClick={handleSquareClick}
          onToggleListening={handleToggleListening}
          onNewCard={handleNewCard}
          onBack={handleBackToCategory}
        >
          <TranscriptPanel
            transcript={speech.transcript}
            interimTranscript={speech.interimTranscript}
            detectedWords={detectedWords}
            isListening={game.isListening}
          />
        </GameBoard>
      )}
      {screen === 'win' && (
        <WinScreen
          game={game}
          onPlayAgain={handlePlayAgain}
          onHome={handleBackToHome}
          onShare={handleShare}
        />
      )}
    </div>
  );
}
