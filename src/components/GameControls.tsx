interface Props {
  isListening: boolean;
  onToggleListening: () => void;
  onNewCard: () => void;
}

export function GameControls({ isListening, onToggleListening, onNewCard }: Props) {
  return (
    <div className="flex gap-4 justify-center mt-6">
      <button
        onClick={onToggleListening}
        className={`group px-6 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 ${
          isListening
            ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
            : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
        }`}
      >
        <span className="text-xl">{isListening ? '⏹️' : '🎙️'}</span>
        <span>{isListening ? 'Stop Listening' : 'Start Listening'}</span>
      </button>

      <button
        onClick={onNewCard}
        className="group px-6 py-4 backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-white/30"
      >
        <span className="text-xl group-hover:rotate-180 transition-transform duration-500">🔄</span>
        <span>New Card</span>
      </button>
    </div>
  );
}
