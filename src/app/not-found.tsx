import { MagneticButton } from "@/animations/MagneticButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col justify-end px-5 pt-32 pb-20 md:px-10 lg:px-16">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-serif text-7xl leading-none">This hour is empty.</h1>
      <p className="mt-6 max-w-sm text-sm leading-7 text-muted">The page is not in the collection.</p>
      <div className="mt-10">
        <MagneticButton href="/">Return home →</MagneticButton>
      </div>
    </section>
  );
}
