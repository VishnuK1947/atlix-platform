interface Props {
  positive: number;
  neutral: number;
  negative: number;
  showLabels?: boolean;
}

export default function SentimentBar({ positive, neutral, negative, showLabels }: Props) {
  return (
    <div className="space-y-1">
      <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
        <div
          className="bg-green-500 transition-all"
          style={{ width: `${positive}%` }}
        />
        <div
          className="bg-[#444] transition-all"
          style={{ width: `${neutral}%` }}
        />
        <div
          className="bg-red-500 transition-all"
          style={{ width: `${negative}%` }}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between text-xs text-[#666]">
          <span className="text-green-500">{positive}% positive</span>
          <span className="text-[#888]">{neutral}% neutral</span>
          <span className="text-red-500">{negative}% negative</span>
        </div>
      )}
    </div>
  );
}
