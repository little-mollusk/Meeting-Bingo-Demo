import { GameState } from '../types';

export function generateShareText(game: GameState): string {
  const timeElapsed = game.startedAt && game.completedAt
    ? Math.floor((game.completedAt - game.startedAt) / 1000)
    : 0;
  const mins = Math.floor(timeElapsed / 60);
  const secs = timeElapsed % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;

  return `Meeting Bingo!

I got BINGO!
Winning word: ${game.winningWord}
Squares filled: ${game.filledCount}/25
Time: ${timeStr}
${game.winningLine?.type} win!

Play at: meetingbingo.vercel.app`;
}

export async function shareResult(game: GameState): Promise<boolean> {
  const text = generateShareText(game);

  // Try native share API first
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Meeting Bingo Result',
        text: text,
      });
      return true;
    } catch (e) {
      // User cancelled or share failed
    }
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}
