import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = ["UX/UI Design", "Product Design", "Design Systems", "Interaction Design", "Prototyping", "Frontend Dev", "Creative Coding"];
const tools = ["Figma", "Framer", "Webflow", "After Effects", "Blender", "Ableton", "VS Code"];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-12 border-t border-border">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest">// About</span>

          <div className="mt-8 grid md:grid-cols-[2fr_1fr] gap-16">
            <div>
              <p className="font-display text-2xl md:text-4xl font-medium leading-snug tracking-tight">
                I'm a product designer and creative technologist specializing in digital experiences, UI systems, and interactive products.
              </p>
              <p className="mt-8 font-mono text-sm text-muted-foreground leading-relaxed max-w-xl">
                My work sits at the intersection of design, programming, and creative experimentation. I enjoy building interfaces, designing systems, and exploring emerging technologies like AI and Web3.
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="font-mono text-xs px-3 py-1.5 border border-border bg-secondary text-secondary-foreground hover:border-primary hover:text-primary transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Tools</h3>
                <p className="font-mono text-sm text-foreground">
                  {tools.join(" • ")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
