import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-12 overflow-hidden">
      {/* Background accent circle */}
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative z-10">
        {/* Status line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-8">
          
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            Available for projects — Tbilisi, Georgia
          </span>
        </motion.div>

        {/* Main title */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,12vw,10rem)] font-bold leading-[0.85] tracking-tighter">
            
            PRODUCT
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,12vw,10rem)] font-bold leading-[0.85] tracking-tighter text-gradient">
            
            DESIGNER
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2rem,8vw,6rem)] font-light leading-[0.85] tracking-tighter text-muted-foreground">
            
            & CREATIVE TECHNOLOGIST
          </motion.h1>
        </div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          <p className="font-mono text-sm text-muted-foreground max-w-md leading-relaxed">
            I design experiences that connect design, technology, and creativity.
            Focused on digital products, interaction design, and creative technology.
          </p>

          <div className="flex gap-6">
            {["GitHub", "LinkedIn", "Twitter"].map((link) =>
            <a
              key={link}
              href="#"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">
              
                {link}
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2">
        
        



        
      </motion.div>
    </section>);

};

export default HeroSection;