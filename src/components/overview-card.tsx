import type { ReactNode } from "react";

interface OverviewCardProps {
  title: string;
  value: ReactNode;
  description: string;
}

export default function OverviewCard({
  title,
  value,
  description,
}: OverviewCardProps) {
  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="text-4xl font-bold mb-2">{value}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
