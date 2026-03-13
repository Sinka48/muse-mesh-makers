import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import projectFintech from "@/assets/project-fintech.jpg";
import projectAiMusic from "@/assets/project-ai-music.jpg";
import projectNft from "@/assets/project-nft.jpg";

const projects = [
  {
    num: "01",
    title: "Fintech Trading Platform",
    role: "Product Designer",
    year: "2025",
    desc: "Designed a crypto trading platform focused on speed, clarity, and mobile-first experience.",
    highlights: ["Dashboard UX", "UI System", "Onboarding"],
    tech: "Figma, React, Tailwind",
    image: projectFintech,
  },
  {
    num: "02",
    title: "AI Music Tool",
    role: "Product Designer / Creative Dev",
    year: "2024",
    desc: "An AI-powered music generation tool for producers and artists.",
    highlights: ["Generative Workflow", "Audio UI", "Visual Identity"],
    tech: "Figma, Web Audio API, AI",
    image: projectAiMusic,
  },
  {
    num: "03",
    title: "NFT Marketplace",
    role: "UX/UI Designer",
    year: "2023",
    desc: "Designed an NFT marketplace focusing on collectors and digital artists.",
    highlights: ["Marketplace UX", "Wallet Flow", "Auctions"],
    tech: "Figma, Web3",
    image: projectNft,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer border-t border-border py-6 md:py-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_auto] gap-4 md:gap-8 items-center">
        {/* Thumbnail */}
        <div className="relative overflow-hidden border border-border bg-card aspect-[16/10] md:aspect-[16/10]">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-all duration-500" />
        </div>

        {/* Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-primary">{project.num}</span>
            <h3 className="font-display text-base md:text-lg font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
            <span>{project.role}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{project.year}</span>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground leading-relaxed max-w-md">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.highlights.map((h) => (
              <span key={h} className="font-mono text-[9px] px-2 py-0.5 border border-border text-muted-foreground">
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          className="hidden md:flex w-8 h-8 border border-border items-center justify-center group-hover:border-primary/50 transition-colors"
          animate={{ rotate: hovered ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.div>
      </div>
    </motion.article>
  );
};

const ProjectsSection = () => {
  return (
    <section id="work" className="py-24 md:py-40 px-6 md:px-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <span className="font-mono text-xs text-primary uppercase tracking-widest">// Selected Work</span>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mt-4">Projects</h2>

        <div className="mt-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
