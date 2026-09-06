import type { ReactNode } from "react";
import { AddToCartConfetti } from "./AddToCartConfetti";
import { ChatAssistant } from "./ChatAssistant";
import { Footer } from "./Footer";
import { HeartCursorTrail } from "./HeartCursorTrail";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatAssistant />
      <HeartCursorTrail />
      <AddToCartConfetti />
    </div>
  );
}
