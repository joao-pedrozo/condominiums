import type { ReactNode } from 'react';

interface OverviewCardProps {
  title: string;
  value: ReactNode;
  description: string;
}

export default function OverviewCard({ title, value, description }: OverviewCardProps) {
  return (
    <div className="rounded-lg bg-muted p-4">
      <h3 className="mb-2 text-4xl font-bold">{value}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
