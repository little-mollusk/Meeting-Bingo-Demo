import { cn } from '../lib/utils';

interface Props {
  transcript: string;
  interimTranscript: string;
  detectedWords: string[];
  isListening: boolean;
}

export function TranscriptPanel({
  transcript,
  interimTranscript,
  detectedWords,
  isListening
}: Props) {
  const displayTranscript = transcript.slice(-200);

  return (
    <div className="backdrop-blur-xl bg-white/20 rounded-2xl p-4 mt-4 border border-white/30 shadow-xl">
      {/* Status indicator */}
      <div className="flex items-center gap-3 mb-3">
        <div className={cn(
          'w-3 h-3 rounded-full shadow-lg',
          isListening
            ? 'bg-red-500 animate-pulse shadow-red-500/50'
            : 'bg-gray-400'
        )} />
        <span className="text-sm font-bold text-white">
          {isListening ? '🎙️ Listening...' : '⏸️ Paused'}
        </span>
      </div>

      {/* Transcript display */}
      <div className="text-sm min-h-[60px] mb-3 p-3 bg-black/20 rounded-xl backdrop-blur">
        <span className="text-white/90">
          {displayTranscript || '💬 Waiting for speech...'}
        </span>
        <span className="text-white/50 italic">
          {interimTranscript}
        </span>
      </div>

      {/* Detected words */}
      {detectedWords.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/20">
          <span className="text-xs text-white/70 font-medium">🎯 Detected:</span>
          {detectedWords.slice(-5).map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="text-xs bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded-full font-bold shadow-md animate-bounce-in"
            >
              ✓ {word}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
