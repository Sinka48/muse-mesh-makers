const MarqueeBanner = () => {
  const text = "DESIGN • CODE • CREATE • EXPLORE • BUILD • EXPERIMENT • ";
  
  return (
    <div className="py-6 border-t border-b border-border overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="font-display text-sm md:text-base font-bold tracking-widest text-muted-foreground/30 uppercase mx-0">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
