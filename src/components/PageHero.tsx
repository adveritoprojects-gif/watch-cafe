export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <header className="px-5 pt-32 pb-12 md:px-10 lg:px-16">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3.6rem,8vw,7rem)] leading-[0.88] tracking-[-0.04em]">{title}</h1>
      <p className="mt-6 max-w-xl text-sm leading-7 text-muted">{copy}</p>
    </header>
  );
}
