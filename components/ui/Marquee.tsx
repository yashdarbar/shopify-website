interface MarqueeProps {
  text: string;
  repeat?: number;
}

export function Marquee({ text, repeat = 4 }: MarqueeProps) {
  const items = Array(repeat).fill(text);

  return (
    <div className="overflow-hidden bg-primary py-3">
      <div className="animate-marquee flex whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={index}
            className="mx-8 text-sm font-semibold uppercase tracking-wider text-white"
          >
            {item} <span className="mx-4 text-accent">•</span>
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, index) => (
          <span
            key={`dup-${index}`}
            className="mx-8 text-sm font-semibold uppercase tracking-wider text-white"
          >
            {item} <span className="mx-4 text-accent">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
