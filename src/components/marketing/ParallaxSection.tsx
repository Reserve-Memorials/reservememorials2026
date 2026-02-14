import type { ReactNode } from "react";

interface ParallaxSectionProps {
  imageSrc: string;
  children: ReactNode;
  className?: string;
}

export function ParallaxSection({
  imageSrc,
  children,
  className,
}: ParallaxSectionProps) {
  return (
    <section
      className={`relative bg-cover bg-center bg-scroll md:bg-fixed ${className ?? ""}`}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
