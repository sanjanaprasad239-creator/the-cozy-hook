import { useState } from "react";
import { useWhatsAppOptIn } from "../hooks/useWhatsAppOptIn";

export function WhatsAppOptInBanner() {
  const { subscribe, isSubscribed } = useWhatsAppOptIn();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const alreadySubscribed = phone.trim() ? isSubscribed(phone.trim()) : false;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim() || !agreed) return;
    subscribe(name.trim(), phone.trim());
    setSubmitted(true);
  }

  if (submitted || alreadySubscribed) {
    return (
      <div
        className="w-full px-6 py-5 rounded-2xl flex items-center gap-3"
        style={{
          background: "rgba(168, 181, 162, 0.15)",
          border: "1px solid rgba(168, 181, 162, 0.35)",
        }}
        data-ocid="whatsapp_banner.success_state"
      >
        <span className="text-xl">🌿</span>
        <p className="font-body text-sm" style={{ color: "#A8B5A2" }}>
          you're in! we'll send you the good stuff on whatsapp 🌿
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "#F7F3EE",
        border: "1px solid rgba(216, 167, 177, 0.25)",
      }}
      data-ocid="whatsapp_banner.section"
    >
      {/* Accent bar */}
      <div
        className="h-1"
        style={{
          background: "linear-gradient(90deg, #D8A7B1 0%, #E8DED3 100%)",
        }}
      />

      <div className="px-6 py-6 sm:px-8">
        <div className="mb-5">
          <h3
            className="font-display text-xl font-semibold"
            style={{ color: "#3A3A3A" }}
          >
            get exclusive offers on whatsapp
          </h3>
          <p className="font-body text-sm mt-1" style={{ color: "#8A7A74" }}>
            join our whatsapp list for new arrivals, special deals, and updates
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
          data-ocid="whatsapp_banner.form"
        >
          {/* Name + Phone row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Name */}
            <div className="flex-1">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="your name (optional)"
                className="w-full rounded-xl font-body text-sm px-4 h-10 border outline-none focus:ring-2 bg-white"
                style={{
                  borderColor: "rgba(216, 167, 177, 0.4)",
                  color: "#3A3A3A",
                }}
                data-ocid="whatsapp_banner.name_input"
              />
            </div>

            {/* Phone with +91 prefix */}
            <div className="flex-1">
              <div
                className="flex items-center rounded-xl overflow-hidden border bg-white"
                style={{ borderColor: "rgba(216, 167, 177, 0.4)" }}
              >
                <span
                  className="font-body text-sm px-3 h-10 flex items-center shrink-0 border-r select-none"
                  style={{
                    color: "#8A7A74",
                    borderColor: "rgba(216, 167, 177, 0.4)",
                    background: "#F7F3EE",
                  }}
                >
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="whatsapp number"
                  className="flex-1 font-body text-sm px-3 h-10 outline-none focus:ring-0 bg-transparent"
                  style={{ color: "#3A3A3A" }}
                  data-ocid="whatsapp_banner.phone_input"
                />
              </div>
            </div>
          </div>

          {/* Consent checkbox */}
          <label
            className="flex items-start gap-2.5 cursor-pointer"
            data-ocid="whatsapp_banner.consent_checkbox"
          >
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-pink-300 shrink-0"
            />
            <span className="font-body text-xs" style={{ color: "#8A7A74" }}>
              yes, i want to receive offers and updates on whatsapp
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={!phone.trim() || !agreed}
            className="rounded-xl font-body text-sm font-medium px-6 h-10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "#D8A7B1", color: "#fff" }}
            data-ocid="whatsapp_banner.submit_button"
          >
            join our whatsapp list
          </button>
        </form>
      </div>
    </div>
  );
}
