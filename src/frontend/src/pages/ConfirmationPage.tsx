import { Button } from "@/components/ui/button";
import { Link, useSearch } from "@tanstack/react-router";
import { motion } from "motion/react";

export function ConfirmationPage() {
  const { name, total, itemCount } = useSearch({ from: "/order-confirmed" });

  function handlePrint() {
    window.print();
  }

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-4 py-16"
      data-ocid="confirmation.page"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        {/* Card */}
        <div
          className="rounded-3xl border border-border overflow-hidden"
          style={{ background: "#FDFBF8" }}
        >
          {/* Top accent bar */}
          <div
            className="h-1.5 w-full"
            style={{
              background:
                "linear-gradient(90deg, #D8A7B1 0%, #A8B5A2 50%, #E8DED3 100%)",
            }}
          />

          <div className="px-8 py-10 text-center">
            {/* Checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "rgba(216, 167, 177, 0.15)" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D8A7B1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                <polyline points="9 12 11.5 14.5 15.5 9.5" />
              </svg>
            </motion.div>

            {/* Heading */}
            <h1
              className="font-display text-2xl sm:text-3xl font-semibold mb-3"
              style={{ color: "#3A3A3A" }}
            >
              thank you for your order!
            </h1>
            <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
              we've received your details and will confirm via whatsapp shortly.
            </p>
          </div>

          {/* Order details box */}
          {name ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mx-6 mb-6 rounded-2xl border border-border overflow-hidden"
              style={{ background: "#F7F3EE" }}
              data-ocid="confirmation.order_summary"
            >
              {/* Customer name row */}
              <div className="px-5 py-3.5 border-b border-border flex justify-between items-center">
                <span className="font-body text-xs text-muted-foreground">
                  order for
                </span>
                <span className="font-body text-sm font-semibold text-foreground">
                  {name}
                </span>
              </div>

              {/* Items count row */}
              <div className="px-5 py-3.5 border-b border-border flex justify-between items-center">
                <span className="font-body text-xs text-muted-foreground">
                  items ordered
                </span>
                <span className="font-body text-sm font-semibold text-foreground">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Total */}
              <div className="px-5 py-3.5">
                <div
                  className="flex justify-between text-sm font-display font-semibold"
                  style={{ color: "#3A3A3A" }}
                >
                  <span>total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </motion.div>
          ) : null}

          {/* Delivery info */}
          <div
            className="mx-6 mb-6 rounded-xl px-4 py-3 text-xs font-body text-center leading-relaxed"
            style={{ background: "#F0EBE6", color: "#8A7A74" }}
          >
            🚚 estimated delivery: 5–7 business days · delivery: ₹49 (free above
            ₹999)
          </div>

          {/* Action buttons */}
          <div className="px-6 pb-8 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="flex-1 rounded-2xl font-body py-5"
              style={{ background: "#D8A7B1", color: "#fff" }}
              data-ocid="confirmation.continue_shopping_button"
            >
              <Link to="/collection">continue shopping</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-2xl font-body py-5 border-border hover:bg-muted/60"
              onClick={handlePrint}
              data-ocid="confirmation.print_receipt_button"
            >
              🖨️ print receipt
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 rounded-2xl font-body py-5 border-border hover:bg-muted/60"
              data-ocid="confirmation.go_home_button"
            >
              <Link to="/">go home</Link>
            </Button>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs font-body text-muted-foreground mt-5">
          questions? reach us on{" "}
          <a
            href="https://wa.me/918660099085"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            whatsapp
          </a>{" "}
          or{" "}
          <a
            href="mailto:sanjanaprasad239@gmail.com"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            email
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
