import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useAdmin } from "../hooks/useAdmin";

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function PressPage() {
  const { settings } = useAdmin();
  const entries = settings.pressEntries ?? [];

  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      data-ocid="press.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p
          className="text-xs font-body tracking-[0.2em] uppercase mb-3"
          style={{ color: "#D8A7B1" }}
        >
          in the spotlight
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
          as seen in
        </h1>
        <div
          className="mt-4 mx-auto w-14 h-0.5 rounded-full"
          style={{ background: "#D8A7B1", opacity: 0.5 }}
        />
        <p className="mt-5 font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          features, mentions, and love from around the web
        </p>
      </motion.div>

      {entries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col items-center justify-center py-24 text-center"
          data-ocid="press.empty_state"
        >
          <span className="text-6xl mb-5">✨</span>
          <p className="font-display text-xl font-semibold text-foreground mb-2">
            no press mentions yet
          </p>
          <p className="font-body text-sm text-muted-foreground max-w-xs">
            we're just getting started — watch this space!
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4" data-ocid="press.list">
          {entries.map((entry, i) => (
            <motion.a
              key={entry.id}
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-card px-6 py-5 shadow-soft hover:shadow-boutique transition-smooth group"
              data-ocid={`press.item.${i + 1}`}
            >
              <div className="min-w-0">
                <p className="font-display text-base font-semibold text-foreground group-hover:underline underline-offset-2 truncate">
                  {entry.title}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  {formatDate(entry.date)}
                </p>
              </div>
              <ExternalLink
                size={16}
                className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}
