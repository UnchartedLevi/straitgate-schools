interface StraitgateWordmarkProps {
  label: string;
  className?: string;
}

export default function StraitgateWordmark({ label, className = '' }: StraitgateWordmarkProps) {
  const iIndex = label.toLowerCase().indexOf('i');

  if (iIndex === -1) return <span className={className}>{label}</span>;

  const isUppercase = label[iIndex] === 'I';

  return (
    <span
      className={className}
      aria-label={label}
      style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
    >
      <span aria-hidden="true">
        {label.slice(0, iIndex)}
        <span className="relative inline-block leading-none">
          {isUppercase ? 'I' : 'ı'}
          <span className="pointer-events-none absolute left-1/2 top-[-0.4em] -translate-x-1/2 text-[0.45em] leading-none text-primary">
            ★
          </span>
        </span>
        {label.slice(iIndex + 1)}
      </span>
    </span>
  );
}
