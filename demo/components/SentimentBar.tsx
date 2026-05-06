interface Props {
  positive: number;
  neutral: number;
  negative: number;
}

export default function SentimentBar({ positive, neutral, negative }: Props) {
  return (
    <div className="space-y-1.5">
      <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
        <div
          className="bg-[#22c55e] transition-all"
          style={{ width: `${positive}%` }}
        />
        <div
          className="bg-[#d4ddd4] transition-all"
          style={{ width: `${neutral}%` }}
        />
        <div
          className="bg-red-400 transition-all"
          style={{ width: `${negative}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px]">
        <span className="text-[#16a34a]">{positive}% positive</span>
        <span className="text-[#7a947a]">{neutral}% neutral</span>
        <span className="text-red-500">{negative}% negative</span>
      </div>
    </div>
  );
}
