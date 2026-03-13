import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ChevronRight } from "lucide-react";
import { useEffect } from "react";

export interface ProjectData {
  num: string;
  title: string;
  role: string;
  year: string;
  desc: string;
  highlights: string[];
  tech: string;
  images?: string[];
  details?: {
    challenge: string;
    approach: string;
    outcome: string;
    gallery: string[];
  };
}

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

const defaultDetails: Record<string, { challenge: string; approach: string; outcome: string }> = {
  "01": {
    challenge:
      "Crypto traders needed a platform that could handle real-time data feeds while maintaining clarity across hundreds of trading pairs and complex order types.",
    approach:
      "I led the redesign from the ground up — establishing a modular component system, creating a dark-optimized color palette for extended screen time, and prototyping interactive chart components with real-time data.",
    outcome:
      "The new platform saw a 40% increase in daily active users and a 60% reduction in support tickets related to UI confusion. Trade execution speed improved by 2x through streamlined workflows.",
  },
  "02": {
    challenge:
      "Musicians and producers needed an intuitive way to interact with AI-generated music without losing creative control or feeling like the tool was a black box.",
    approach:
      "Designed a node-based generative workflow where users could visually connect musical parameters. Built custom audio visualization components and created a visual identity that felt both technical and artistic.",
    outcome:
      "The tool was featured in several music production communities and gained 10K+ beta users in the first month. Users reported spending 3x more time creating compared to similar tools.",
  },
  "03": {
    challenge:
      "The NFT space was cluttered with confusing interfaces. Collectors and artists needed a marketplace that felt premium while simplifying complex Web3 interactions like wallet connections and bidding.",
    approach:
      "Focused on abstracting blockchain complexity behind familiar e-commerce patterns. Designed a seamless wallet integration flow and created an auction system with real-time bidding updates.",
    outcome:
      "Successfully launched with 500+ artists onboarded in the first week. The simplified UX led to a 70% completion rate for first-time NFT purchases, well above industry average.",
  },
};

const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const details = project ? defaultDetails[project.num] : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md overflow-y-auto"
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="fixed top-6 right-6 md:top-10 md:right-10 z-[110] w-12 h-12 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </motion.button>

          <div className="min-h-screen px-6 md:px-12 lg:px-24 py-20 md:py-28">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">
                    // Project {project.num}
                  </span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    {project.year}
                  </span>
                </div>

                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
                  {project.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <span className="font-mono text-sm text-muted-foreground border border-border px-4 py-2">
                    {project.role}
                  </span>
                  <span className="font-mono text-sm text-muted-foreground border border-border px-4 py-2">
                    {project.tech}
                  </span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-20 pb-20 border-b border-border"
              >
                <div>
                  <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
                    Overview
                  </span>
                </div>
                <p className="font-mono text-base md:text-lg text-secondary-foreground leading-relaxed">
                  {project.desc}
                </p>
              </motion.div>

              {/* Challenge / Approach / Outcome */}
              {details && (
                <div className="space-y-16 mb-20 pb-20 border-b border-border">
                  {[
                    { label: "The Challenge", text: details.challenge, delay: 0.3 },
                    { label: "Approach", text: details.approach, delay: 0.4 },
                    { label: "Outcome", text: details.outcome, delay: 0.5 },
                  ].map((section) => (
                    <motion.div
                      key={section.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: section.delay }}
                      className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16"
                    >
                      <div>
                        <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
                          {section.label}
                        </span>
                      </div>
                      <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
                        {section.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-20"
              >
                <span className="font-mono text-[11px] text-primary uppercase tracking-widest mb-8 block">
                  Key Highlights
                </span>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.highlights.map((h, i) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                      className="border border-border p-6 group hover:border-primary transition-colors duration-300"
                    >
                      <span className="font-display text-4xl font-bold text-secondary group-hover:text-primary transition-colors duration-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-mono text-sm text-foreground mt-3">{h}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center justify-between py-8 border-t border-border"
              >
                <button
                  onClick={onClose}
                  className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
                >
                  ← Back to Projects
                </button>
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-foreground transition-colors uppercase tracking-widest"
                >
                  View Live Project
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
