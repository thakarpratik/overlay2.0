export default function SectionTitle({
  kicker,
  title,
  desc
}: {
  kicker?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl">
      {kicker && <div className="text-xs font-medium text-neutral-500">{kicker.toUpperCase()}</div>}
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      {desc && <p className="mt-2 text-neutral-600">{desc}</p>}
    </div>
  );
}
