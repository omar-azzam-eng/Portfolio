interface SectionTitleProps {
  readonly number: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly id: string;
}

export function SectionTitle({ number, eyebrow, title, id }: SectionTitleProps) {
  return (
    <header className="section-title">
      <span className="section-number" aria-hidden="true">
        {number}
      </span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
    </header>
  );
}
