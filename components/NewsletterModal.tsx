"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "newsletter_modal_dismissed";

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        const timer = setTimeout(() => setOpen(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      // ignore localStorage unavailability
    }
  }, []);

  const handleClose = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (err) {
      // ignore
    }
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with backend or newsletter provider
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? handleClose() : setOpen(v))}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assine nossa newsletter</DialogTitle>
          <DialogDescription>
            Receba novidades, eventos e oportunidades diretamente no seu e-mail.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
          <div className="flex gap-2">
            <Button type="submit" className="btn-primary">Quero receber</Button>
            <Button type="button" variant="ghost" onClick={handleClose}>Agora não</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
