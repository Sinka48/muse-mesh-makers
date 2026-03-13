import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, ExternalLink } from "lucide-react";

const tracks = [
  { title: "Dissolve", duration: "4:32", bpm: "72", genre: "Ambient" },
  { title: "Fractal Loop", duration: "3:18", bpm: "128", genre: "Electronic" },
  { title: "Signal Lost", duration: "5:47", bpm: "90", genre: "Experimental" },
  { title: "Neon Drift", duration: "3:55", bpm: "110", genre: "Electronic" },
  { title: "Quiet Machine", duration: "6:12", bpm: "65", genre: "Ambient" },
];

const TrackRow = ({ track, index, inView }: { track: typeof tracks[0]; index: number; inView: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[40px_1fr_100px_80px_60px] items-center gap-4 py-4 border-b border-border hover:bg-card/50 transition-colors cursor-pointer px-2 md:px-4"
    >
      {/* Play / number */}
      <div className="flex items-center justify-center w-8 h-8">
        {hovered ? (
          <Play className="w-3.5 h-3.5 text-primary fill-primary" />
        ) : (
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Title + genre on mobile */}
      <div>
        <span className="font-display text-sm font-medium group-hover:text-primary transition-colors">
          {track.title}
        </span>
        <span className="md:hidden font-mono text-[10px] text-muted-foreground ml-2">{track.genre}</span>
      </div>

      {/* Genre - desktop */}
      <span className="hidden md:block font-mono text-[11px] text-muted-foreground">{track.genre}</span>

      {/* BPM - desktop */}
      <span className="hidden md:block font-mono text-[11px] text-muted-foreground">{track.bpm} BPM</span>

      {/* Duration */}
      <span className="font-mono text-[11px] text-muted-foreground text-right">{track.duration}</span>
    </motion.div>
  );
};

const MusicSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="music" className="py-24 md:py-40 px-6 md:px-12 border-t border-border">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
            <div>
              <span className="font-mono text-xs text-primary uppercase tracking-widest">// Music</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mt-4">Sound</h2>
            </div>
            <p className="font-mono text-xs text-muted-foreground max-w-sm leading-relaxed">
              Electronic music & sound experiments. Exploring ambient textures, algorithmic compositions, and the space between noise and melody.
            </p>
          </div>

          {/* Waveform visual */}
          <div className="border border-border bg-card p-6 md:p-8 mb-8">
            <div className="flex items-center gap-6 mb-6">
              <button className="w-12 h-12 border border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all group/btn">
                <Play className="w-4 h-4 text-primary group-hover/btn:text-primary-foreground fill-current" />
              </button>
              <div>
                <p className="font-display text-sm font-medium">Now Playing</p>
                <p className="font-mono text-[11px] text-muted-foreground">Dissolve — Ambient · 72 BPM</p>
              </div>
            </div>

            {/* Waveform bars */}
            <div className="flex items-end gap-[2px] h-16 md:h-20">
              {Array.from({ length: 80 }).map((_, i) => {
                const height = Math.sin(i * 0.3) * 30 + Math.random() * 25 + 15;
                return (
                  <motion.div
                    key={i}
                    className="flex-1 bg-primary/20 hover:bg-primary/60 transition-colors min-w-[2px]"
                    initial={{ height: 4 }}
                    animate={inView ? { height: `${height}%` } : {}}
                    transition={{ duration: 0.6, delay: i * 0.01 }}
                  />
                );
              })}
            </div>

            {/* Time */}
            <div className="flex justify-between mt-3">
              <span className="font-mono text-[10px] text-muted-foreground">0:00</span>
              <span className="font-mono text-[10px] text-muted-foreground">4:32</span>
            </div>
          </div>

          {/* Track list header */}
          <div className="hidden md:grid grid-cols-[40px_1fr_100px_80px_60px] gap-4 px-4 py-2 border-b border-border">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">#</span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Title</span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Genre</span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">BPM</span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest text-right">Time</span>
          </div>

          {/* Tracks */}
          {tracks.map((track, i) => (
            <TrackRow key={track.title} track={track} index={i} inView={inView} />
          ))}

          {/* Links */}
          <div className="flex flex-wrap gap-6 mt-10">
            {["SoundCloud", "Spotify", "Bandcamp"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group/link"
              >
                {platform}
                <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicSection;
