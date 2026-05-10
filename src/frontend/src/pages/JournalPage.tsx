import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

const POSTS = [
  {
    id: 1,
    title: "The Art of Choosing the Right Yarn",
    excerpt:
      "Not all yarn is created equal. After years of crocheting, here's how I pick the softest, most durable yarn for every project — from plushies to wearables.",
    category: "Behind the Scenes",
    emoji: "🧶",
  },
  {
    id: 2,
    title: "Custom Orders: How It All Works",
    excerpt:
      "Ever wondered what happens after you send a custom order request? From concept to creation, I walk you through the entire process of bringing your idea to life.",
    category: "Process",
    emoji: "✨",
  },
  {
    id: 3,
    title: "Crochet as Self-Care: Why I Keep Going",
    excerpt:
      "In a world that moves too fast, crochet is my slow-down. Looping yarn is meditative, grounding, and deeply satisfying in a way that little else is.",
    category: "Musings",
    emoji: "🌿",
  },
];

export function JournalPage() {
  return (
    <div className="min-h-screen bg-background" data-ocid="journal.page">
      {/* Hero */}
      <section className="bg-muted/40 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="font-body text-xs tracking-[0.25em] text-primary uppercase font-medium">
              Stories & Reflections
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-semibold text-foreground leading-tight">
              Journal
            </h1>
            <div className="w-10 h-0.5 bg-primary mx-auto rounded-full" />
            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Crafting stories, one stitch at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wavy separator */}
      <div className="relative h-6 bg-background overflow-hidden">
        <svg
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full text-muted/40"
          aria-hidden="true"
        >
          <path
            d="M0 12 Q150 0 300 12 Q450 24 600 12 Q750 0 900 12 Q1050 24 1200 12"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Coming Soon Banner */}
      <section className="py-10 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-accent/30 border border-primary/20 rounded-2xl px-6 py-3 flex items-center gap-3"
          >
            <span className="text-lg" aria-hidden="true">
              🌸
            </span>
            <p className="font-body text-sm text-foreground/80">
              The journal is being lovingly crafted —{" "}
              <span className="font-medium text-primary">coming soon!</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Placeholder Cards */}
      <section className="pb-20 pt-6 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {POSTS.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                data-ocid={`journal.item.${post.id}`}
                className="group bg-card rounded-3xl p-6 sm:p-8 shadow-soft hover:shadow-boutique transition-smooth"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-muted/60 flex items-center justify-center text-2xl group-hover:scale-110 transition-smooth">
                    {post.emoji}
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="secondary"
                        className="font-body text-xs rounded-full"
                      >
                        {post.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="font-body text-xs rounded-full border-primary/30 text-primary/80"
                      >
                        Coming Soon
                      </Badge>
                    </div>

                    <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground leading-snug group-hover:text-primary transition-smooth">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center space-y-3"
            data-ocid="journal.empty_state"
          >
            <span className="text-4xl block" aria-hidden="true">
              🪡
            </span>
            <p className="font-body text-sm text-muted-foreground">
              More stories are being woven. Check back soon!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
