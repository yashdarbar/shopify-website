interface MarqueeProps {
  text: string;
  repeat?: number;
}

export function Marquee({ text, repeat = 4 }: MarqueeProps) {
  const items = Array(repeat).fill(text);

  return (
    <div className="overflow-hidden bg-accent py-3">
      <div className="animate-marquee flex whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={index}
            className="mx-8 text-sm font-semibold uppercase tracking-wider text-white"
          >
            {item} <span className="mx-4">•</span>
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, index) => (
          <span
            key={`dup-${index}`}
            className="mx-8 text-sm font-semibold uppercase tracking-wider text-white"
          >
            {item} <span className="mx-4">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
