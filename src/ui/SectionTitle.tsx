interface SectionTitleProps {
  readonly number: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly id: string;
}

export function SectionTitle({ number, eyebrow, title, id }: SectionTitleProps) {
  return (
    <header className="section-title">
      <div>
        <p className="eyebrow">
          <span className="section-number" aria-hidden="true">
            {number}
          </span>{' '}
          {eyebrow}
        </p>
        <h2 id={id}>{title}</h2>
      </div>
    </header>
  );
}
