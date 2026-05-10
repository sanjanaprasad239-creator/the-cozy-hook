import { Button } from "@/components/ui/button";
import { CheckCircle2, ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe0BlM1VYW-igf5GLSDMpDddolGnPASMygeFOfyRiTfdiGfPQ/viewform?pli=1";

const WHATSAPP_NOTIFY_URL = `https://wa.me/918660099085?text=${encodeURIComponent(
  "Hi! I've submitted a custom crochet order request via The Cozy Hook website. Please let me know the next steps! 🧶",
)}`;

interface CustomOrderModalProps {
  open: boolean;
  onClose: () => void;
}

export function CustomOrderModal({ open, onClose }: CustomOrderModalProps) {
  const [step, setStep] = useState<"info" | "confirm">("info");

  function handleFormOpen() {
    window.open(GOOGLE_FORM_URL, "_blank");
  }

  function handleSubmitted() {
    window.open(WHATSAPP_NOTIFY_URL, "_blank");
    setStep("confirm");
  }

  function handleClose() {
    onClose();
    // Reset after animation
    setTimeout(() => setStep("info"), 300);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            data-ocid="custom_order.dialog"
          >
            <dialog
              open
              className="bg-card rounded-3xl shadow-boutique-lg max-w-md w-full p-8 relative m-0"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-smooth text-muted-foreground"
                aria-label="Close"
                data-ocid="custom_order.close_button"
              >
                <X className="w-4 h-4" />
              </button>

              <AnimatePresence mode="wait">
                {step === "info" ? (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    className="space-y-5"
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                      🧶
                    </div>

                    <div>
                      <h2 className="font-display text-2xl font-semibold text-foreground">
                        Custom Orders
                      </h2>
                      <p className="mt-2 text-sm font-body text-muted-foreground leading-relaxed">
                        Have something special in mind? Share your custom
                        crochet request — colours, characters, dimensions —
                        anything! I love bringing unique ideas to life.
                      </p>
                    </div>

                    <ul className="space-y-2">
                      {[
                        "Any colour or colour combination",
                        "Custom sizes and characters",
                        "Personalised gifts & bulk orders",
                        "Turnaround: 7–14 working days",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm font-body text-foreground"
                        >
                          <span className="text-primary mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-3 pt-2">
                      <Button
                        className="w-full rounded-xl font-body gap-2"
                        onClick={handleFormOpen}
                        data-ocid="custom_order.open_form_button"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Fill Custom Order Form
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full rounded-xl font-body gap-2"
                        onClick={handleSubmitted}
                        data-ocid="custom_order.submitted_button"
                      >
                        ✅ I've submitted!
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center gap-5 py-4"
                    data-ocid="custom_order.success_state"
                  >
                    <CheckCircle2 className="w-16 h-16 text-secondary" />
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-foreground">
                        Order Received! 🎉
                      </h2>
                      <p className="mt-2 text-sm font-body text-muted-foreground leading-relaxed">
                        Thank you for your custom order request! I'll be in
                        touch via WhatsApp within 24 hours to discuss the
                        details.
                      </p>
                    </div>
                    <Button
                      className="rounded-xl font-body"
                      onClick={handleClose}
                      data-ocid="custom_order.confirm_button"
                    >
                      Done
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </dialog>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
