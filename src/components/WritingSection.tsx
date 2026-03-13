import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const posts = [
  { title: "Designing for AI Interfaces", desc: "Thoughts on designing products powered by machine learning." },
  { title: "The Future of Creative Tools", desc: "How AI will change creative workflows." },
];

const WritingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="writing" className="py-24 md:py-40 px-6 md:px-12 border-t border-border">
      <div ref={ref} className="max-w-6xl mx-auto">
        <span className="font-mono text-xs text-primary uppercase tracking-widest">// Writing</span>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mt-4">Thoughts</h2>

        <div className="mt-16 space-y-0">
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex items-center justify-between py-8 border-t border-border hover:pl-4 transition-all duration-300"
            >
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="font-mono text-xs text-muted-foreground mt-1">{post.desc}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all duration-300 shrink-0 ml-4" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WritingSection;
