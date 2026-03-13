import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ProjectDetailModal, { type ProjectData } from "./ProjectDetailModal";

const projects = [
  {
    num: "01",
    title: "Fintech Trading Platform",
    role: "Product Designer",
    year: "2025",
    desc: "Designed a crypto trading platform focused on speed, clarity, and mobile-first experience.",
    highlights: ["Redesigned dashboard experience", "Created modular UI system", "Improved onboarding flow"],
    tech: "Figma, React, Tailwind",
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    ],
  },
  {
    num: "02",
    title: "AI Music Tool",
    role: "Product Designer / Creative Developer",
    year: "2024",
    desc: "An AI-powered music generation tool for producers and artists.",
    highlights: ["Designed generative workflow", "Built interactive audio UI", "Created visual identity"],
    tech: "Figma, Web Audio API, AI tools",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
      "https://images.unsplash.com/photo-1571974599782-87624638275e?w=800&q=80",
    ],
  },
  {
    num: "03",
    title: "NFT Marketplace",
    role: "UX/UI Designer",
    year: "2023",
    desc: "Designed an NFT marketplace focusing on collectors and digital artists.",
    highlights: ["Marketplace UX", "Wallet integration flow", "Auction mechanics"],
    tech: "Figma, Web3 integrations",
    images: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      "https://images.unsplash.com/photo-1643101809204-6fb869816dbe?w=800&q=80",
      "https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=800&q=80",
    ],
  },
];

const ProjectCard = ({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) => {
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
      onClick={onClick}
      className="group border-t border-border py-12 md:py-16 cursor-pointer"
    >
      <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-start">
        {/* Number */}
        <span className="font-display text-6xl md:text-8xl font-bold text-secondary leading-none group-hover:text-primary transition-colors duration-500">
          {project.num}
        </span>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-4 flex-wrap">
            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <motion.span animate={{ rotate: hovered ? 45 : 0 }} transition={{ duration: 0.3 }}>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span>{project.role}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{project.year}</span>
          </div>

          <p className="font-mono text-sm text-muted-foreground max-w-lg">{project.desc}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.highlights.map((h) => (
              <span key={h} className="font-mono text-[11px] px-2.5 py-1 border border-border text-muted-foreground">
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Tech */}
        <div className="hidden md:block">
          <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">Tech</span>
          <p className="font-mono text-xs text-foreground mt-1 max-w-[150px]">{project.tech}</p>
        </div>
      </div>

      {/* Hover line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="h-[1px] bg-primary mt-12 origin-left"
      />
    </motion.article>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <>
      <section id="work" className="py-24 md:py-40 px-6 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">// Selected Work</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mt-4">
            Projects
          </h2>

          <div className="mt-16">
            {projects.map((project, i) => (
              <ProjectCard key={project.num} project={project} index={i} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </div>
      </section>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};

export default ProjectsSection;
