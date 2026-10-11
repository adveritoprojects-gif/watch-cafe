"use client";

import { watches } from "@/data/watches";
import { FormEvent, useState } from "react";

export function ContactForm({ piece }: { piece?: string }) {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const name = String(data.get("name") ?? "");
    if (!name || !email.includes("@")) return;
    setSent(true);
  };

  if (sent) {
    return <p className="text-sm leading-7 text-muted">The note is with the atelier. A reply will follow by email.</p>;
  }

  return (
    <form onSubmit={submit} className="grid gap-6">
      <Field id="name" label="Name" />
      <Field id="email" label="Email" type="email" />
      <label className="grid gap-2 text-[0.68rem] tracking-[0.22em] uppercase text-muted">
        Piece
        <select
          name="piece"
          defaultValue={piece ?? ""}
          className="border-b border-line bg-transparent py-3 text-base tracking-normal text-ink normal-case outline-none"
        >
          <option value="">General enquiry</option>
          {watches.map((watch) => (
            <option key={watch.id} value={watch.slug}>
              {watch.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-[0.68rem] tracking-[0.22em] uppercase text-muted">
        Message
        <textarea name="message" required rows={5} className="border-b border-line bg-transparent py-3 text-base tracking-normal text-ink normal-case outline-none" />
      </label>
      <button type="submit" className="gold-link w-fit" data-cursor="cta">
        Send <span aria-hidden>→</span>
      </button>
    </form>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <label htmlFor={id} className="grid gap-2 text-[0.68rem] tracking-[0.22em] uppercase text-muted">
      {label}
      <input id={id} name={id} type={type} required className="border-b border-line bg-transparent py-3 text-base tracking-normal text-ink normal-case outline-none" />
    </label>
  );
}
