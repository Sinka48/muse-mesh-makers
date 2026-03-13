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
    highlights: ["Redesigned dashboard experience", "Created modular UI system", "Improved onboarding flow"],
    tech: "Figma, React, Tailwind",
    image: projectFintech,
  },
  {
    num: "02",
    title: "AI Music Tool",
    role: "Product Designer / Creative Developer",
    year: "2024",
    desc: "An AI-powered music generation tool for producers and artists.",
    highlights: ["Designed generative workflow", "Built interactive audio UI", "Created visual identity"],
    tech: "Figma, Web Audio API, AI tools",
    image: projectAiMusic,
  },
  {
    num: "03",
    title: "NFT Marketplace",
    role: "UX/UI Designer",
    year: "2023",
    desc: "Designed an NFT marketplace focusing on collectors and digital artists.",
    highlights: ["Marketplace UX", "Wallet integration flow", "Auction mechanics"],
    tech: "Figma, Web3 integrations",
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
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden border border-border bg-card aspect-[16/10] mb-6">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-background/60 group-hover:bg-background/30 transition-all duration-500" />
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <span className="font-display text-5xl md:text-7xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors duration-500 leading-none">
            {project.num}
          </span>
        </div>
        <motion.div
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 border border-border bg-background/80 flex items-center justify-center"
          animate={{ rotate: hovered ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.div>
      </div>

      {/* Info */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2 flex-1">
          <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>{project.role}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{project.year}</span>
          </div>
          <p className="font-mono text-xs text-muted-foreground max-w-md leading-relaxed">{project.desc}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 md:max-w-[200px] md:justify-end">
          {project.highlights.map((h) => (
            <span key={h} className="font-mono text-[10px] px-2 py-1 border border-border text-muted-foreground">
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="h-[1px] bg-primary mt-8 origin-left"
      />
    </motion.article>
  );
};

const ProjectsSection = () => {
  return (
    <section id="work" className="py-24 md:py-40 px-6 md:px-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <span className="font-mono text-xs text-primary uppercase tracking-widest">// Selected Work</span>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mt-4">
          Projects
        </h2>

        <div className="mt-16 grid gap-16 md:gap-20">
          {projects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
