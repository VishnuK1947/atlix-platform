interface Props {
  positive: number;
  neutral: number;
  negative: number;
}

export default function SentimentBar({ positive, neutral, negative }: Props) {
  return (
    <div className="space-y-1.5">
      <div
        className="flex h-1.5 rounded-full overflow-hidden"
        style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.30)" }}
      >
        <div style={{ width: `${positive}%`, background: "var(--sentiment-pos)" }} />
        <div style={{ width: `${neutral}%`, background: "var(--sentiment-neu)" }} />
        <div style={{ width: `${negative}%`, background: "var(--sentiment-neg)" }} />
      </div>
      <div className="flex justify-between text-[10px] font-mono">
        <span style={{ color: "var(--sentiment-pos)" }}>{positive}% pos</span>
        <span style={{ color: "var(--sentiment-neu)" }}>{neutral}% neu</span>
        <span style={{ color: "var(--sentiment-neg)" }}>{negative}% neg</span>
      </div>
    </div>
  );
}
