import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Zap, Eye, Music, ArrowUpRight, Code, Palette, Waves } from "lucide-react";

const experiments = [
  {
    icon: Eye,
    title: "Interactive UI Lab",
    desc: "A playground of small UI experiments exploring animation, micro-interactions, and unconventional interface patterns. Built with React, Framer Motion, and WebGL.",
    tags: ["React", "Framer Motion", "WebGL"],
    status: "Ongoing",
    count: "12 experiments",
    secondaryIcon: Code,
  },
  {
    icon: Zap,
    title: "AI Visual Generator",
    desc: "A tool for generating visual compositions, posters, and abstract art using AI models. Combines prompt engineering with generative design principles.",
    tags: ["Stable Diffusion", "Python", "Canvas API"],
    status: "v2.0",
    count: "500+ generations",
    secondaryIcon: Palette,
  },
  {
    icon: Music,
    title: "Generative Music",
    desc: "Algorithmic music explorations using Web Audio API and Tone.js. Creating ambient soundscapes and rhythmic patterns through code and mathematical sequences.",
    tags: ["Tone.js", "Web Audio", "MIDI"],
    status: "Active",
    count: "8 tracks",
    secondaryIcon: Waves,
  },
];

const ExperimentCard = ({ exp, index, inView }: { exp: typeof experiments[0]; index: number; inView: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group border border-border bg-card p-6 md:p-8 cursor-pointer relative overflow-hidden flex flex-col"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Animated corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-12 h-12 border-b border-l border-primary/20"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <exp.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest">{exp.status}</span>
            </div>
          </div>
          <motion.div animate={{ rotate: hovered ? 45 : 0 }} transition={{ duration: 0.3 }}>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.div>
        </div>

        {/* Title & description */}
        <h3 className="font-display text-lg md:text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
          {exp.title}
        </h3>
        <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6 flex-1">
          {exp.desc}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 mb-4">
          <exp.secondaryIcon className="w-3 h-3 text-muted-foreground" />
          <span className="font-mono text-[10px] text-muted-foreground">{exp.count}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span key={tag} className="font-mono text-[10px] px-2 py-1 border border-border text-muted-foreground group-hover:border-primary/30 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom hover line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

const ExperimentsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experiments" className="py-24 md:py-40 px-6 md:px-12 border-t border-border">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <span className="font-mono text-xs text-primary uppercase tracking-widest">// Experiments</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mt-4">Lab</h2>
          </div>
          <p className="font-mono text-xs text-muted-foreground max-w-sm leading-relaxed">
            Side projects and explorations at the edge of design, code, and creative technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {experiments.map((exp, i) => (
            <ExperimentCard key={exp.title} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;
