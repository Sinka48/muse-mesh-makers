import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Game from "./Game";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-40 px-6 md:px-12 border-t border-border">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest">// Contact</span>

          <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter mt-4">
            Let's work<br />
            <span className="text-gradient">together</span>
          </h2>

          <div className="mt-16 grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <a
                href="mailto:your@email.com"
                className="block font-display text-xl md:text-2xl font-bold hover:text-primary transition-colors"
              >
                your@email.com
              </a>
              <div className="flex flex-wrap gap-6">
                {[
                  { name: "Website", url: "#" },
                  { name: "LinkedIn", url: "#" },
                  { name: "Twitter", url: "#" },
                  { name: "GitHub", url: "#" },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground">
          © 2025 Sinka. All rights reserved.
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          Built with creativity & code
        </span>
      </div>
    </section>
  );
};

export default ContactSection;
