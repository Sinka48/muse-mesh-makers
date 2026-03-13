import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Headphones } from "lucide-react";

const genres = ["Ambient", "Experimental", "Electronic"];

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
          <span className="font-mono text-xs text-primary uppercase tracking-widest">// Music</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mt-4">Sound</h2>

          <div className="mt-16 flex flex-col md:flex-row items-start gap-12 md:gap-20">
            {/* Visualizer placeholder */}
            <div className="w-full md:w-1/2 aspect-square border border-border bg-card flex items-center justify-center relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="flex items-end gap-1 h-24">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary/40 group-hover:bg-primary transition-colors"
                    animate={{
                      height: [
                        Math.random() * 60 + 10,
                        Math.random() * 80 + 20,
                        Math.random() * 40 + 10,
                      ],
                    }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1">
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8">
                Besides design, I produce electronic music and sound experiments. Exploring the space between ambient textures and algorithmic compositions.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {genres.map((g) => (
                  <span key={g} className="font-mono text-xs px-4 py-2 border border-border text-foreground hover:border-primary hover:text-primary transition-colors cursor-default">
                    {g}
                  </span>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:underline"
              >
                <Headphones className="w-4 h-4" />
                Listen on SoundCloud / Spotify
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicSection;
