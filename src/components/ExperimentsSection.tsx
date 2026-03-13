import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Eye, Music } from "lucide-react";

const experiments = [
  { icon: Eye, title: "Interactive UI Lab", desc: "Small UI experiments exploring animation and interaction." },
  { icon: Zap, title: "AI Visual Generator", desc: "Tool for generating visual compositions using AI." },
  { icon: Music, title: "Generative Music", desc: "Algorithmic music explorations and audio design." },
];

const ExperimentsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experiments" className="py-24 md:py-40 px-6 md:px-12 border-t border-border">
      <div ref={ref} className="max-w-6xl mx-auto">
        <span className="font-mono text-xs text-primary uppercase tracking-widest">// Experiments</span>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mt-4">
          Lab
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group border border-border bg-card p-8 hover-lift cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <exp.icon className="w-6 h-6 text-primary mb-6" />
                <h3 className="font-display text-lg font-bold mb-2">{exp.title}</h3>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;
