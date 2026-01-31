import { CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';

interface Props {
  onSelect: (categoryId: CategoryId) => void;
  onBack: () => void;
}

export function CategorySelect({ onSelect, onBack }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-16 text-6xl opacity-20">📚</div>
        <div className="absolute bottom-24 left-16 text-5xl opacity-20">💡</div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <h2 className="text-4xl font-black text-white text-center mb-2 drop-shadow-lg">
          Pick Your Poison 🎯
        </h2>
        <p className="text-white/80 text-center mb-8 text-lg">
          What kind of meeting torture are you in for today?
        </p>

        <div className="grid gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className="group p-6 backdrop-blur-xl bg-white/20 rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:bg-white/30 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-5">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </span>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-white/80">{category.description}</p>
                </div>
                <span className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all text-2xl">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onBack}
          className="mt-8 mx-auto flex items-center gap-2 text-white/80 hover:text-white transition-colors text-lg font-medium"
        >
          <span>←</span>
          <span>🏠 Back to Home</span>
        </button>
      </div>
    </div>
  );
}
