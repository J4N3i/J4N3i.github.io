const TOPIC_OPTIONS = [
  'Internship opportunity',
  'Project collaboration',
  'Just saying hi',
] as const;

export type TopicOption = (typeof TOPIC_OPTIONS)[number];

interface TopicChipsProps {
  selectedTopic: TopicOption | null;
  onToggleTopic: (topic: TopicOption) => void;
}

export const TopicChips = ({ selectedTopic, onToggleTopic }: TopicChipsProps) => {
  return (
    <div className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-white/70 ml-1">
        Topic (optional)
      </span>
      <div className="flex flex-wrap gap-2.5">
        {TOPIC_OPTIONS.map((topic) => {
          const isSelected = selectedTopic === topic;
          return (
            <button
              key={topic}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggleTopic(topic)}
              className={`min-h-[44px] px-4 py-2.5 rounded-full text-xs font-medium border transition-all active:scale-[0.98] inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isSelected
                  ? 'bg-primary text-white border-primary shadow-sm shadow-primary/30'
                  : 'bg-white/5 text-white/70 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              {topic}
            </button>
          );
        })}
      </div>
    </div>
  );
};
