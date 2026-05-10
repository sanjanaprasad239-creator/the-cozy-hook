import { motion } from "motion/react";

const timelineEvents = [
  {
    year: "2021",
    title: "The First Stitch",
    description:
      "It all began on a quiet winter evening with a single crochet hook and a ball of soft cream yarn. What started as stress relief quickly became a deep, meditative love.",
  },
  {
    year: "2022",
    title: "Gifting with Heart",
    description:
      "Friends and family started asking for handmade pieces. Each gifted plushie, keychain, and wearable carried a little note — 'made with love'. The joy on their faces was unforgettable.",
  },
  {
    year: "2023",
    title: "The Cozy Hook is Born",
    description:
      "What was once a hobby became a small, passionate studio. The Cozy Hook launched with a simple mission: to bring warmth, softness, and care into everyday life through handmade crochet.",
  },
  {
    year: "Today",
    title: "Every Piece, Made for You",
    description:
      "Every item in The Cozy Hook is still crocheted by hand, with the same love as that very first stitch. We pour care into every loop, every knot, every finished edge — because you deserve nothing less.",
  },
];

const values = [
  {
    icon: "🧶",
    title: "Handmade Always",
    description:
      "No machines, no shortcuts. Every piece is crocheted by hand from start to finish.",
  },
  {
    icon: "🌿",
    title: "Premium Materials",
    description:
      "We use only soft, high-quality yarn that feels as good as it looks.",
  },
  {
    icon: "💌",
    title: "Made with Love",
    description:
      "Each order is packed with care and a little handwritten touch of warmth.",
  },
];

function CrochetDivider() {
  return (
    <div className="flex items-center gap-3 my-2" aria-hidden="true">
      <div className="flex-1 h-px bg-border" />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-primary/50 flex-shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <path
          d="M12 5 C8 5 5 8 5 12 C5 16 8 19 12 19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M12 5 C16 5 19 8 19 12 C19 16 16 19 12 19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8 8 Q6 10 6 12"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M16 8 Q18 10 18 12"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

export function OurStoryPage() {
  return (
    <div className="min-h-screen bg-background" data-ocid="our_story.page">
      {/* Hero Section */}
      <section className="bg-muted/40 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="font-body text-xs tracking-[0.25em] text-primary uppercase font-medium">
              About Us
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-semibold text-foreground leading-tight">
              Our Story
            </h1>
            <CrochetDivider />
            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              A passion for crochet, a love for handmade warmth, and a dream to
              share it with the world — one stitch at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Decorative yarn SVG top */}
      <div className="relative overflow-hidden h-8 bg-background">
        <svg
          viewBox="0 0 1200 32"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full text-muted/40"
          aria-hidden="true"
        >
          <path
            d="M0 16 Q150 0 300 16 Q450 32 600 16 Q750 0 900 16 Q1050 32 1200 16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Founder Story */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-5 gap-10 items-start"
          >
            {/* Soft portrait placeholder */}
            <div className="sm:col-span-2">
              <div className="aspect-[4/5] rounded-3xl bg-accent/30 flex flex-col items-center justify-center shadow-boutique overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  className="text-primary/30"
                  aria-hidden="true"
                >
                  <circle cx="40" cy="28" r="16" fill="currentColor" />
                  <path
                    d="M10 72 C10 54 20 46 40 46 C60 46 70 54 70 72"
                    fill="currentColor"
                  />
                </svg>
                <p className="mt-3 font-body text-sm text-primary/60 font-medium">
                  Sanjana Prasad
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Founder & maker
                </p>
              </div>
            </div>

            {/* Story text */}
            <div className="sm:col-span-3 space-y-5 font-body text-muted-foreground leading-loose text-[0.94rem]">
              <p>
                Hi, I'm{" "}
                <span className="text-foreground font-medium">Sanjana</span> —
                the hands and heart behind The Cozy Hook. What started as a
                quiet evening hobby quickly became a creative obsession. There's
                something deeply satisfying about turning a humble ball of yarn
                into something someone cherishes.
              </p>
              <p>
                Every plushie, keychain, and wearable is crocheted by hand in my
                little home studio. I pour care into every stitch — from
                selecting soft, premium yarn to making sure each piece passes my
                very particular quality eye before it goes out the door.
              </p>
              <p>
                The Cozy Hook is for anyone who appreciates the warmth of
                handmade things. Whether you're treating yourself or gifting
                someone dear, you're receiving something made with real love and
                zero shortcuts.
              </p>
              <p className="text-foreground font-medium">
                Thank you for being here. It truly means the world. 🌷
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {[
              { value: "39+", label: "Unique Products" },
              { value: "100%", label: "Handmade" },
              { value: "∞", label: "Love Stitched In" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-5 sm:p-6 text-center shadow-soft"
              >
                <p className="font-display text-3xl sm:text-4xl font-semibold text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 font-body text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl text-foreground font-semibold">
              How it all began
            </h2>
            <div className="w-10 h-0.5 bg-primary mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[1.85rem] top-0 bottom-0 w-px bg-border sm:left-1/2" />

            <div className="space-y-10">
              {timelineEvents.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className={`relative flex gap-6 sm:gap-0 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-[1.35rem] sm:left-1/2 top-2 w-2.5 h-2.5 rounded-full bg-primary border-2 border-card shadow-soft -translate-x-1/2 flex-shrink-0" />

                  {/* Content */}
                  <div
                    className={`ml-12 sm:ml-0 sm:w-1/2 ${
                      i % 2 === 0 ? "sm:pr-10" : "sm:pl-10"
                    }`}
                  >
                    <div className="bg-card rounded-2xl p-5 shadow-boutique hover:shadow-boutique-lg transition-smooth">
                      <span className="inline-block font-body text-xs font-semibold tracking-widest text-primary uppercase mb-2">
                        {event.year}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {event.title}
                      </h3>
                      <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block sm:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl text-foreground font-semibold">
              What we stand for
            </h2>
            <div className="w-10 h-0.5 bg-primary mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-card rounded-3xl p-6 text-center shadow-soft hover:shadow-boutique transition-smooth"
              >
                <span className="text-4xl block mb-4">{val.icon}</span>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {val.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-5xl">🧶</span>
            <p className="font-display text-2xl sm:text-3xl text-foreground font-semibold leading-snug">
              "Every stitch is a little act of love."
            </p>
            <p className="font-body text-sm text-muted-foreground">
              — Sanjana, The Cozy Hook
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
