import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import heroOrb from "@/assets/hero-orb.jpg";
import { ScrollProgress, Spotlight, Magnetic, TiltCard, RevealText, Marquee, Parallax } from "@/components/portfolio-fx";
import {
  Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight,
  Code2, Database, Wrench, Sparkles, Trophy, GraduationCap, Languages,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Portfolio });

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      className={`relative mx-auto max-w-6xl px-6 py-24 md:py-32 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Nav() {
  const links = [
    ["About", "about"], ["Skills", "skills"], ["Projects", "projects"],
    ["Education", "education"], ["Contact", "contact"],
  ];
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-2 py-2 hidden md:flex items-center gap-1"
    >
      <a href="#top" className="px-4 py-2 text-sm font-display font-semibold text-gradient">SVR.</a>
      {links.map(([label, id]) => (
        <a key={id} href={`#${id}`}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full transition-colors hover:bg-white/5">
          {label}
        </a>
      ))}
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-accent/30 blur-[120px]" />
      </motion.div>

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute right-[8%] top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <motion.img
          src={heroOrb} alt="" width={500} height={500}
          className="w-[420px] h-[420px] object-contain animate-float drop-shadow-[0_0_80px_oklch(0.72_0.22_310/0.5)]"
          initial={{ scale: 0.8, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-6xl w-full px-6 z-10">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.15 } } }}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-mono text-muted-foreground mb-8">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Available for opportunities
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-bold leading-[0.95] mb-6">
            <RevealText text="Sabari" />
            <br />
            <RevealText text="Venkat Raj." className="[&_span:last-child]:text-gradient" delay={0.2} />
          </h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10">
            Computer Science engineer crafting <span className="text-foreground">elegant web & mobile experiences</span> with a passion for clean code and bold design.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Magnetic>
              <a href="#projects"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-primary-foreground bg-[var(--gradient-primary)] glow hover:scale-105 transition-transform">
                View Projects <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium glass hover:bg-white/10 transition">
                Get in touch
              </a>
            </Magnetic>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-16 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Tamil Nadu, India</span>
            <span className="hidden sm:flex items-center gap-2"><Mail className="h-4 w-4" /> sabarvenkatraj2005@gmail.com</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground"
      >
        scroll ↓
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <Section id="about">
      <motion.span variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-accent">01 — About</motion.span>
      <motion.h2 variants={fadeUp} className="mt-3 text-4xl md:text-6xl font-bold max-w-3xl">
        Engineer by training, <span className="text-gradient">builder by nature</span>.
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-8 text-lg text-muted-foreground max-w-3xl leading-relaxed">
        I'm a Computer Science Engineering student at KPR Institute of Engineering and Technology with a
        strong foundation in programming and problem-solving. I love translating ideas into polished
        software — from AI-powered platforms to intuitive mobile apps.
      </motion.p>

      <div className="mt-16 grid sm:grid-cols-3 gap-6">
        {[
          { k: "7.4", l: "Current CGPA" },
          { k: "2+", l: "Major Projects" },
          { k: "1st", l: "Tech Fest Winner" },
        ].map((s) => (
          <motion.div key={s.l} variants={fadeUp}
            className="glass rounded-2xl p-8 hover:border-primary/40 transition-colors">
            <div className="text-5xl font-display font-bold text-gradient">{s.k}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

const skillGroups = [
  { icon: Code2, title: "Languages", items: ["C", "Java", "Python", "JavaScript"] },
  { icon: Sparkles, title: "Web", items: ["HTML", "CSS", "React.js", "Tailwind CSS"] },
  { icon: Database, title: "Database", items: ["MySQL", "Firebase"] },
  { icon: Wrench, title: "Tools", items: ["VS Code", "Git", "GitHub", "Postman", "Chrome DevTools"] },
];

function Skills() {
  return (
    <Section id="skills">
      <motion.span variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-accent">02 — Toolkit</motion.span>
      <motion.h2 variants={fadeUp} className="mt-3 text-4xl md:text-6xl font-bold">Stack & skills.</motion.h2>

      <div className="mt-16 grid md:grid-cols-2 gap-5">
        {skillGroups.map((g) => (
          <motion.div key={g.title} variants={fadeUp}>
            <TiltCard className="glass rounded-2xl p-7 group relative overflow-hidden h-full">
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl group-hover:bg-primary/40 transition" />
              <div className="relative flex items-center gap-3 mb-5">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="h-10 w-10 rounded-xl bg-[var(--gradient-primary)] flex items-center justify-center"
                >
                  <g.icon className="h-5 w-5 text-primary-foreground" />
                </motion.div>
                <h3 className="text-xl font-semibold">{g.title}</h3>
              </div>
              <div className="relative flex flex-wrap gap-2">
                {g.items.map((i, idx) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, backgroundColor: "oklch(0.72 0.22 310 / 0.2)" }}
                    className="px-3 py-1.5 rounded-full text-sm font-mono bg-white/5 border border-white/10 text-muted-foreground cursor-default"
                  >
                    {i}
                  </motion.span>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

const projects = [
  {
    name: "Evalio AI",
    year: "2025",
    desc: "Built a major portion of the question generator interface and admin enhancements. Teachers upload images, auto-converted to LaTeX and stored — supporting graph-based, 2D and 3D diagrams at scale.",
    stack: ["React.js", "Node.js", "Firebase", "Postman", "Google Generative AI"],
  },
  {
    name: "Expense Tracker App",
    year: "2024",
    desc: "Cross-platform mobile app to manage personal finances. Add, edit and categorize expenses with visual reports, monthly budget tracking and intuitive summaries.",
    stack: ["React Native", "Firebase", "JavaScript", "Tailwind CSS"],
  },
];

function Projects() {
  return (
    <Section id="projects">
      <motion.span variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-accent">03 — Selected work</motion.span>
      <motion.h2 variants={fadeUp} className="mt-3 text-4xl md:text-6xl font-bold">Projects.</motion.h2>

      <div className="mt-16 space-y-6">
        {projects.map((p, i) => (
          <motion.article
            key={p.name} variants={fadeUp}
            whileHover={{ scale: 1.01 }}
            className="glass rounded-3xl p-8 md:p-12 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[var(--gradient-radial)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-6 items-start">
              <div className="font-mono text-sm text-muted-foreground">0{i + 1}</div>
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="text-3xl md:text-4xl font-bold group-hover:text-gradient transition-all">{p.name}</h3>
                  <span className="font-mono text-sm text-muted-foreground">{p.year}</span>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10">{s}</span>
                  ))}
                </div>
              </div>
              <ArrowUpRight className="h-7 w-7 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all" />
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

const education = [
  { degree: "B.E. Computer Science & Engineering", inst: "KPR Institute of Engineering and Technology", year: "2024 – 2027", grade: "CGPA: 7.4" },
  { degree: "Diploma in Engineering", inst: "PA Polytechnic College", year: "2021 – 2023", grade: "72%" },
  { degree: "SSLC", inst: "Vighneswar Vidhya Mandhir Matric Hr. Sec. School", year: "2020 – 2021", grade: "—" },
];

function Education() {
  return (
    <Section id="education">
      <motion.span variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-accent">04 — Background</motion.span>
      <motion.h2 variants={fadeUp} className="mt-3 text-4xl md:text-6xl font-bold">Education & wins.</motion.h2>

      <div className="mt-16 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {education.map((e) => (
            <motion.div key={e.degree} variants={fadeUp}
              className="glass rounded-2xl p-6 flex items-start gap-5 hover:border-primary/40 transition">
              <div className="h-11 w-11 shrink-0 rounded-xl bg-primary/15 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <h3 className="font-semibold text-lg">{e.degree}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{e.year}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{e.inst}</p>
                <p className="font-mono text-sm text-accent mt-2">{e.grade}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="space-y-4">
          <div className="glass rounded-2xl p-6">
            <Trophy className="h-6 w-6 text-accent mb-3" />
            <h3 className="font-semibold mb-3">Achievements</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>🏆 First Prize — Tech Fest, Nehru College</li>
              <li>📜 Paper presented at Blaze25 (GCD)</li>
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <Languages className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-semibold mb-3">Languages</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Tamil — Fluent</li>
              <li>English — Fluent</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" className="!py-32">
      <div className="glass rounded-[2rem] p-10 md:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-radial)]" />
        <motion.div className="relative" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.span variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-accent">05 — Contact</motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 text-5xl md:text-7xl font-bold leading-tight">
            Let's build <span className="text-gradient">something great</span>.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Open to internships, freelance projects, and collaboration. Drop a message — I reply fast.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="mailto:sabarvenkatraj2005@gmail.com"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-primary-foreground bg-[var(--gradient-primary)] glow hover:scale-105 transition-transform">
              <Mail className="h-4 w-4" /> sabarvenkatraj2005@gmail.com
            </a>
            <a href="tel:+918667594235"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium glass hover:bg-white/10 transition">
              <Phone className="h-4 w-4" /> +91 86675 94235
            </a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 flex justify-center gap-3">
            {[
              { I: Github, href: "https://github.com" },
              { I: Linkedin, href: "https://linkedin.com" },
              { I: Mail, href: "mailto:sabarvenkatraj2005@gmail.com" },
            ].map(({ I, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer"
                className="h-12 w-12 rounded-full glass flex items-center justify-center hover:bg-white/10 hover:scale-110 transition">
                <I className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <p className="mt-12 text-center text-sm text-muted-foreground font-mono">
        © 2026 Sabari Venkat Raj — Designed & built with care.
      </p>
    </Section>
  );
}

function Portfolio() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Spotlight />
      <Nav />
      <Hero />
      <About />
      <Marquee items={["React", "TypeScript", "Node.js", "Firebase", "Tailwind", "Python", "Java", "MySQL"]} />
      <Skills />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
}
