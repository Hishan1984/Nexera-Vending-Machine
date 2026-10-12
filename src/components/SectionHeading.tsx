interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  heading,
  subheading,
  center = true,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${center ? 'mx-auto text-center' : 'text-left'} max-w-3xl ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl lg:text-4xl text-balance">{heading}</h2>
      {subheading && (
        <p className="mt-4 text-base leading-relaxed text-navy/70 sm:text-lg">{subheading}</p>
      )}
    </div>
  );
}
