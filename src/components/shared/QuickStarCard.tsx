
type QuickStatCardProps = {
  value: string;
  label: string;
  isAccent?: boolean;
};

export const QuickStatCard = ({ value, label, isAccent = false }: QuickStatCardProps) => {
  return (
    <div className="text-center p-4 rounded-xl bg-muted/20">
      <p className={`text-2xl font-bold ${isAccent ? "text-accent" : "text-card-foreground"}`}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
};
